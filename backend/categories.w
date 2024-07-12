bring cloud;
bring ex;
bring util;
bring http;
bring "./auth.w" as basicAuth;
bring "./broadcaster.w" as broadcaster;

enum ColumnType {
  STRING,
  NUMBER
}

/*************************************************************************
 * Define a category Item Struct
 *************************************************************************/

 struct Category {
    id: str;
    name: str;
    description: str;
    createdAt: str;
  }

  /*************************************************************************
 * Define category interface
 *************************************************************************/
pub interface ICategoryStorage extends std.IResource {
    inflight add(category: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): Category?;
    inflight list(): Array<Json>;
  }


  /******************************************************************************
 * Create a CategoryStorage Class that implements the ICategoryStorage interface
 *****************************************************************************/
 pub class CategoryStorage impl ICategoryStorage {
    db: ex.Table;
    counter: cloud.Counter;
    
    new() {
      let tableProps = ex.TableProps{
        name: "CategoriesTable",
        primaryKey: "id",
        columns: {
          id: ColumnType.STRING,
          name: ColumnType.STRING,
          description: ColumnType.STRING
        }
      };
      this.db = new ex.Table(tableProps);
      this.counter = new cloud.Counter();
    }
  
    inflight _add(id: str, j: Json) {
      this.db.insert(id, j);
    }
  
    pub inflight add(category: Json): str {
    
      let id = "{this.counter.inc()}";
      let categoryJson = {
        id: id,
        name: category.get("name"),
        description: category.get("description")
      };
      this._add(id, categoryJson);
      log("adding task {id} with data: {categoryJson}");
      return "Product with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting category {id}");
    }
  
    pub inflight get(id: str): Category {
    let categoryJson = this.db.tryGet(id);
        return Category.fromJson(categoryJson);
    }
  
    pub inflight list(): Array<Json> {
    let categoryJson = this.db.list();
    log("{categoryJson.length}");
        return categoryJson;
    }
  
  }

  /***************************************************
 * Create a ProductService Class with api endpoints
 ***************************************************/
 pub class CategoryService {
    pub api: cloud.Api;
    pub auth: basicAuth.BasicAuth;
    pub myBroadcaster: broadcaster.Broadcaster;
    categoryStorage: ICategoryStorage;
  
    new(storage: ICategoryStorage, api: cloud.Api, auth: basicAuth.BasicAuth, broadcaster: broadcaster.Broadcaster) {

      this.auth = auth;
      this.api = api;
      this.myBroadcaster = broadcaster;
  
      this.categoryStorage = storage;
  
      // API endpoints
      this.api.post("/categories", inflight (req): cloud.ApiResponse => {
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
          let category = Json.parse(req.body!);
          let id = this.categoryStorage.add(category);
          // let prev = counter.inc();
          this.myBroadcaster.broadcast("refresh");
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
  
      this.api.get("/category/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let category = this.categoryStorage.get(id);
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
          return {
            status:200,
            body: Json.stringify(category)
          };
      });
  
      this.api.get("/categories", inflight (req): cloud.ApiResponse => {
          let categories = this.categoryStorage.list();
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
          return {
            status:200,
            body: Json.stringify({
              items: categories
            })
          };
      });
  
    }
  }
