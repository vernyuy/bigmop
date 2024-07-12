bring cloud;
bring ex;
bring util;
bring http;
bring "./auth.w" as basicAuth;
bring "./broadcaster.w" as broadcaster;
bring "./product.w" as product;

enum ColumnType {
  STRING,
  NUMBER
}

/*************************************************************************
 * Define a subSubCategory Item Struct
 *************************************************************************/

 struct SubCategory {
    id: str;
    name: str;
    description: str;
    parentCategoryID: str;
  }

  /*************************************************************************
 * Define subSubCategory interface
 *************************************************************************/
pub interface ISubCategoryStorage extends std.IResource {
    inflight add(subSubCategory: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): SubCategory?;
    inflight list(): Array<Json>;
  }


  /******************************************************************************
 * Create a SubCategoryStorage Class that implements the ISubCategoryStorage interface
 *****************************************************************************/
 pub class SubCategoryStorage impl ISubCategoryStorage {
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
  
    pub inflight add(subSubCategory: Json): str {
    
      let id = "{this.counter.inc()}";
      let subSubCategoryJson = {
        id: id,
        name: subSubCategory.get("name"),
        description: subSubCategory.get("description")
      };
      this._add(id, subSubCategoryJson);
      log("adding task {id} with data: {subSubCategoryJson}");
      return "Product with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting subSubCategory {id}");
    }
  
    pub inflight get(id: str): SubCategory {
    let subSubCategoryJson = this.db.tryGet(id);
        return SubCategory.fromJson(subSubCategoryJson);
    }
  
    pub inflight list(): Array<Json> {
    let subSubCategoryJson = this.db.list();
    log("{subSubCategoryJson.length}");
        return subSubCategoryJson;
    }
  
  }

  /***************************************************
 * Create a ProductService Class with api endpoints
 ***************************************************/
 pub class SubCategoryService {
    pub api: cloud.Api;
    pub auth: basicAuth.BasicAuth;
    prodStorage: product.IProductStorage;
    pub myBroadcaster: broadcaster.Broadcaster;
    subSubCategoryStorage: ISubCategoryStorage;
  
    new(storage: ISubCategoryStorage, prodStore: product.IProductStorage, api: cloud.Api, auth: basicAuth.BasicAuth, broadcaster: broadcaster.Broadcaster) {

      this.auth = auth;
      this.api = api;
      this.myBroadcaster = broadcaster;
      this.prodStorage = prodStore;
      this.subSubCategoryStorage = storage;
  
      // API endpoints
      this.api.post("/subCategories", inflight (req): cloud.ApiResponse => {
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
          let subSubCategory = Json.parse(req.body!);
          let id = this.subSubCategoryStorage.add(subSubCategory);
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
  
      this.api.get("/subSubCategory/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let subSubCategory = this.subSubCategoryStorage.get(id);
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
            body: Json.stringify(subSubCategory)
          };
      });
  
      this.api.get("/subCategories", inflight (req): cloud.ApiResponse => {
          let subSubCategorys = this.subSubCategoryStorage.list();
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
              items: subSubCategorys
            })
          };
      });
  
    }
  }
