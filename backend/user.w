bring cloud;
bring ex;
bring util;
bring http;
bring "./auth.w" as basicAuth;
enum ColumnType {
  STRING,
  NUMBER
}

/*************************************************************************
 * Define a user Item Struct
 *************************************************************************/

 struct User {
    id: str;
    firstName: str;
    lastName: str;
    dob: str;
    username: str;
    email: str;
    imageUrl: str;
  }

  /*************************************************************************
 * Define user interface
 *************************************************************************/
pub interface IUserStorage extends std.IResource {
    inflight add(user: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): User?;
    inflight updateUser(id: str, qty: num): void;
    inflight list(): Array<Json>;
  }

  /******************************************************************************
 * Create a UserStorage Class that implements the IUserStorage interface
 *****************************************************************************/
 pub class UserStorage impl IUserStorage {
    db: ex.Table;
    counter: cloud.Counter;
    
  
    new() {
      let tableProps = ex.TableProps{
        name: "UsersTable",
        primaryKey: "id",
        columns: {
          id: ColumnType.STRING,
          firstName: ColumnType.STRING,
          lastName: ColumnType.STRING,
          email: ColumnType.STRING,
          username: ColumnType.STRING,
          dob: ColumnType.STRING,
          imageUrl: ColumnType.STRING
        }
      };
      this.db = new ex.Table(tableProps);
      this.counter = new cloud.Counter();
    }
  
    inflight _add(id: str, j: Json) {
      this.db.insert(id, j);
    }
  
    pub inflight add(user: Json): str {
      let id = "{this.counter.inc()}";
      let userJson = {
        id: id,
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        dob: user.get("dob"),
        email: user.get("email"),
        username: user.get("username"),
        imageUrl: user.get("imageUrl")
      };
      this._add(id, userJson);
      log("adding user {id} with data: {userJson}");
      return "User with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting user {id}");
    }
  
    pub inflight get(id: str): User {
    let userJson = this.db.tryGet(id);
        return User.fromJson(userJson);
    }
  
    pub inflight list(): Array<Json> {
    let userJson = this.db.list();
    log("{userJson.length}");
        return userJson;
    }
  
    pub inflight updateUser(id: str, qty: num) {
        let userId = id;
        let orderQty = qty;
        let response = this.db.tryGet(userId);
        let prodQty = response!.get("qty");
        let totalQty = num.fromJson(prodQty) - orderQty;
        let updatedItem = {
          qty: totalQty
        };
        this.db.update(userId, updatedItem);
      }
  }

  /***************************************************
 * Create a UserService Class with api endpoints
 ***************************************************/
 pub class UserService {
    pub api: cloud.Api;
    pub auth: basicAuth.BasicAuth;
    userStorage: IUserStorage;
  
    new(storage: IUserStorage, api: cloud.Api,auth: basicAuth.BasicAuth) {

    this.auth = auth;
      this.api = api;
  
      this.userStorage = storage;
  
      // API endpoints
      this.api.post("/user", inflight (req): cloud.ApiResponse => {
        let authenticated = auth.call(req);  
      if (!authenticated) {
          return {
            status: 401,
            headers: {
              "Content-Type" => "text/plain"
            },
            body: "Unauthorized"
          };
        }  
      
      if let body = req.body {
          let user = Json.parse(req.body!);
          let id = this.userStorage.add(user);
          return {
            status:201,
            body: id
          };
        } else {
          return {
            status: 400,
          };
        }
      });
  
      this.api.get("/user/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let user = this.userStorage.get(id);
          return {
            status:200,
            body: Json.stringify(user)
          };
      });
  
      this.api.get("/users", inflight (req): cloud.ApiResponse => {
          let users = this.userStorage.list();
          
          return {
            status:200,
            body: Json.stringify({
              items: users
            })
          };
      });
  
    }
  }
