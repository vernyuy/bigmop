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


struct CartItemDetails{
  productID: str;
  qty: num;
  totalPrice: num;
}

/*************************************************************************
 * Define a cart Item Struct
 *************************************************************************/

 struct Cart {
    id: str;
    productId: str;
    userId: str;
    status: str;
    qty: num;
    createdAt: str;
  }

  /*************************************************************************
 * Define cart interface
 *************************************************************************/
pub interface ICartStorage extends std.IResource {
    inflight addItemToCart(productId: str, userId: str, qty:num): str;
    inflight remove(id: str): void;
    inflight getCartItem(id: str, userId: str): Cart?;
    inflight updateCartStatus(id: str, userID: str): void;
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
          productId: ColumnType.STRING,
          status: ColumnType.STRING,
          qty: ColumnType.NUMBER
        }
      };
      this.db = new ex.Table(tableProps);
      this.counter = new cloud.Counter();
    }
  
    inflight _add(id: str, cartItem: Json) {
      this.db.insert(id, cartItem);
    }
  
    pub inflight addItemToCart(productId: str, userId: str, qty: num): str {
      let id = "{this.counter.inc()}";
      let cartJson = {
        id: id,
        productId: productId,
        userId: userId,
        qty: qty,
        status: "PENDING",
      };
      this._add(id, cartJson);
      log("adding cart {id} with data: {cartJson}");
      return "Cart with id {id} added successfully";
    }
  
    pub inflight remove(id: str) {
      this.db.delete(id);
      log("deleting cart {id}");
    }
  
    pub inflight getCartItem(id: str, userId: str): Cart {
    let cartJson = this.db.tryGet(id);
    let cartItems: Array<Cart> = [];
    let userCartItems = cartJson?.get("userId");
    let pendindCartItems = userCartItems?.get("PENDING");
        return Cart.fromJson(pendindCartItems);
    }
  
  
    pub inflight updateCartStatus(id: str, userID: str) {
        let cartId = id;
        let response = this.db.tryGet(cartId);
        let cartStatus = response!.get("PENDING");
        let updatedItem = {
          status: "COMPLETED"
        };
        this.db.update(cartId, updatedItem);
      }

      pub inflight updateCartProductQuantity(id: str, qty: num, userID: str, productID: str) {
        let cartId = id;
        let orderQty = qty;
        let userId = userID;
        let productId = productID;
        let response = this.db.tryGet(cartId);
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
      this.api.post("/cart/:productId/:userId/:qty", inflight (req): cloud.ApiResponse => {
        if let body = req.body {
          let cart = Json.parse(req.body!);
          let productId = req.vars.get("productId");
          let userId = req.vars.get("userId");
          let qty = req.vars.get("qty");
          let productQty = num.fromJson(qty);
          let id = this.cartStorage.addItemToCart( productId, userId, productQty);
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
  
      this.api.get("/cart/:id/:userId", inflight (req): cloud.ApiResponse => {
          let id = req.vars.get("id");
          let userId = req.vars.get("userId");
          let cart = this.cartStorage.getCartItem(id, userId);
          return {
            status:200,
            body: Json.stringify(cart)
          };
      });
  
    }
  }
