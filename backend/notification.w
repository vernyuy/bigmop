bring cloud;
bring ex;
bring util;
bring http;
bring "./auth.w" as basicAuth;
bring "./broadcaster.w" as broadcaster;
bring "./user.w" as user;

enum ColumnType {
  STRING,
  NUMBER
}

/*************************************************************************
 * Define a notification Item Struct
 *************************************************************************/

 struct Notification {
    id: str;
    name: str;
    description: str;
  }

  /*************************************************************************
 * Define notification interface
 *************************************************************************/
pub interface INotificationStorage extends std.IResource {
    inflight add(notification: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): Notification?;
    inflight list(): Array<Json>;
  }


  /******************************************************************************
 * Create a NotificationStorage Class that implements the INotificationStorage interface
 *****************************************************************************/
 pub class NotificationStorage impl INotificationStorage {
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
  
    pub inflight add(notification: Json): str {
    
      let id = "{this.counter.inc()}";
      let notificationJson = {
        id: id,
        name: notification.get("name"),
        description: notification.get("description")
      };
      this._add(id, notificationJson);
      log("adding task {id} with data: {notificationJson}");
      return "Product with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting notification {id}");
    }
  
    pub inflight get(id: str): Notification {
    let notificationJson = this.db.tryGet(id);
        return Notification.fromJson(notificationJson);
    }
  
    pub inflight list(): Array<Json> {
    let notificationJson = this.db.list();
    log("{notificationJson.length}");
        return notificationJson;
    }
  
  }

  /***************************************************
 * Create a ProductService Class with api endpoints
 ***************************************************/
 pub class NotificationService {
    pub api: cloud.Api;
    pub auth: basicAuth.BasicAuth;
    pub myBroadcaster: broadcaster.Broadcaster;
    userStore: user.IUserStorage;
    notificationStorage: INotificationStorage;
  
    new(storage: INotificationStorage, userStore: user.IUserStorage, api: cloud.Api, auth: basicAuth.BasicAuth, broadcaster: broadcaster.Broadcaster) {

      this.auth = auth;
      this.api = api;
      this.myBroadcaster = broadcaster;
      this.userStore = userStore;
      this.notificationStorage = storage;
  
      // API endpoints
      this.api.post("/notifications", inflight (req): cloud.ApiResponse => {
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
          let notification = Json.parse(req.body!);
          let id = this.notificationStorage.add(notification);
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
  
      this.api.get("/notification/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let notification = this.notificationStorage.get(id);
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
            body: Json.stringify(notification)
          };
      });
  
      this.api.get("/notifications", inflight (req): cloud.ApiResponse => {
          let notifications = this.notificationStorage.list();
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
              items: notifications
            })
          };
      });
  
    }
  }
