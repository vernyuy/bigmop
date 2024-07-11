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
 * Define a cart Item Struct
 *************************************************************************/

 struct Cart {
    id: str;
    firstName: str;
    lastName: str;
    dob: str;
    cartname: str;
    email: str;
    imageUrl: str;
  }

  /*************************************************************************
 * Define cart interface
 *************************************************************************/
pub interface ICartStorage extends std.IResource {
    inflight add(cart: Json): str;
    inflight remove(id: str): void;
    inflight get(id: str): Cart?;
    inflight updateCart(id: str, qty: num): void;
    inflight list(): Array<Json>;
  }

  /******************************************************************************
 * Create a CartStorage Class that implements the ICartStorage interface
 *****************************************************************************/
 pub class CartStorage impl ICartStorage {
    db: ex.Table;
    counter: cloud.Counter;
    
  
    new() {
      let tableProps = ex.TableProps{
        name: "CartsTable",
        primaryKey: "id",
        columns: {
          id: ColumnType.STRING,
          firstName: ColumnType.STRING,
          lastName: ColumnType.STRING,
          email: ColumnType.STRING,
          cartname: ColumnType.STRING,
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
  
    pub inflight add(cart: Json): str {
      let id = "{this.counter.inc()}";
      let cartJson = {
        id: id,
        firstName: cart.get("firstName"),
        lastName: cart.get("lastName"),
        dob: cart.get("dob"),
        email: cart.get("email"),
        cartname: cart.get("cartname"),
        imageUrl: cart.get("imageUrl")
      };
      this._add(id, cartJson);
      log("adding cart {id} with data: {cartJson}");
      return "Cart with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting cart {id}");
    }
  
    pub inflight get(id: str): Cart {
    let cartJson = this.db.tryGet(id);
        return Cart.fromJson(cartJson);
    }
  
    pub inflight list(): Array<Json> {
    let cartJson = this.db.list();
    log("{cartJson.length}");
        return cartJson;
    }
  
    pub inflight updateCart(id: str, qty: num) {
        let cartId = id;
        let orderQty = qty;
        let response = this.db.tryGet(cartId);
        let prodQty = response!.get("qty");
        let totalQty = num.fromJson(prodQty) - orderQty;
        let updatedItem = {
          qty: totalQty
        };
        this.db.update(cartId, updatedItem);
      }
  }

  /***************************************************
 * Create a CartService Class with api endpoints
 ***************************************************/
 pub class CartService {
  pub api: cloud.Api;
  pub auth: basicAuth.BasicAuth;
  prodStorage: product.IProductStorage;
  pub myBroadcaster: broadcaster.Broadcaster;
    cartStorage: ICartStorage;
  
    new(storage: ICartStorage, prodStore: product.IProductStorage, api: cloud.Api, auth: basicAuth.BasicAuth, broadcaster: broadcaster.Broadcaster) {
      
    this.auth = auth;
    this.api = api;
    this.myBroadcaster = broadcaster;
    this.prodStorage = prodStore;
      this.cartStorage = storage;
  
      // API endpoints
      this.api.post("/cart", inflight (req): cloud.ApiResponse => {
        if let body = req.body {
          let cart = Json.parse(req.body!);
          let id = this.cartStorage.add(cart);
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
  
      this.api.get("/cart/:id", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let cart = this.cartStorage.get(id);
          return {
            status:200,
            body: Json.stringify(cart)
          };
      });
  
      this.api.get("/carts", inflight (req): cloud.ApiResponse => {
          let carts = this.cartStorage.list();
          
          return {
            status:200,
            body: Json.stringify({
              items: carts
            })
          };
      });
  
    }
  }
