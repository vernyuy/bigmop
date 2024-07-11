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
 * Define a product Item Struct
 *************************************************************************/

 struct Product {
    id: str;
    name: str;
    qty: num;
    price: num;
    imageUrl: str;
    description: str;
    unit: str;
    images: str;
  }

  /*************************************************************************
 * Define product interface
 *************************************************************************/
pub interface IProductStorage extends std.IResource {
    inflight add(product: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): Product?;
    inflight updateProduct(id: str, qty: num): void;
    inflight list(): Array<Json>;
  }


  /******************************************************************************
 * Create a ProductStorage Class that implements the IProductStorage interface
 *****************************************************************************/
 pub class ProductStorage impl IProductStorage {
    db: ex.Table;
    counter: cloud.Counter;
    
    new() {
      let tableProps = ex.TableProps{
        name: "ProductsTable",
        primaryKey: "id",
        columns: {
          id: ColumnType.STRING,
          name: ColumnType.STRING,
          qty: ColumnType.NUMBER,
          price: ColumnType.NUMBER,
          imageUrl: ColumnType.STRING,
          description: ColumnType.STRING,
          unit: ColumnType.STRING
        }
      };
      this.db = new ex.Table(tableProps);
      this.counter = new cloud.Counter();
    }
  
    inflight _add(id: str, j: Json) {
      this.db.insert(id, j);
    }
  
    pub inflight add(product: Json): str {
    
      let id = "{this.counter.inc()}";
      let productJson = {
        id: id,
        name: product.get("name"),
        qty: product.get("qty"),
        price: product.get("price"),
        imageUrl: product.get("imageUrl")
      };
      this._add(id, productJson);
      log("adding task {id} with data: {productJson}");
      return "Product with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting product {id}");
    }
  
    pub inflight get(id: str): Product {
    let productJson = this.db.tryGet(id);
        return Product.fromJson(productJson);
    }
  
    pub inflight list(): Array<Json> {
    let productJson = this.db.list();
    log("{productJson.length}");
        return productJson;
    }
  
    pub inflight updateProduct(id: str, qty: num) {
        let productId = id;
        let orderQty = qty;
        let response = this.db.tryGet(productId);
        let prodQty = response!.get("qty");
        let totalQty = num.fromJson(prodQty) - orderQty;
        let updatedItem = {
          qty: totalQty
        };
        this.db.update(productId, updatedItem);
      }
  }

  /***************************************************
 * Create a ProductService Class with api endpoints
 ***************************************************/
 pub class ProductService {
    pub api: cloud.Api;
    pub auth: basicAuth.BasicAuth;
    pub myBroadcaster: broadcaster.Broadcaster;
    productStorage: IProductStorage;
  
    new(storage: IProductStorage, api: cloud.Api, auth: basicAuth.BasicAuth, broadcaster: broadcaster.Broadcaster) {

      this.auth = auth;
      this.api = api;
      this.myBroadcaster = broadcaster;
  
      this.productStorage = storage;
  
      // API endpoints
      this.api.post("/product", inflight (req): cloud.ApiResponse => {
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
          let product = Json.parse(req.body!);
          let id = this.productStorage.add(product);
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
  
      this.api.get("/product/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let product = this.productStorage.get(id);
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
            body: Json.stringify(product)
          };
      });
  
      this.api.get("/products", inflight (req): cloud.ApiResponse => {
          let products = this.productStorage.list();
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
              items: products
            })
          };
      });
  
    }
  }
