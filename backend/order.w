bring cloud;
bring ex;
bring util;
bring http;
bring expect;
bring "./product.w" as product;
bring "./auth.w" as basicAuth;
// let queue = new cloud.Queue();

enum ColumnType {
  STRING,
  NUMBER
}

enum OrderStatus {
  PENDING,
  PROCESSING,
  COMPLETED
}

struct OrderedItem{
  productID: str;
  qty: num;
  totalPrice: num;
}

/*************************************************************************
 * Define an order Item Struct
 *************************************************************************/
struct Order {
  id: str;
  status: str;
  userID: str;
  cartID: str;
  orderedProducts: Array<Map<OrderedItem>>;
  createdAt: str;
}



/*************************************************************************
 * Define Order interface
 *************************************************************************/
interface IOrderStorage extends std.IResource {
  inflight add(id: str, j: Json): void;
  inflight get(id: str): Order?;
  inflight list(): Array<Json>?;
  inflight updateOrderStatus(id: str, userId: str, status: str): void;
}



/******************************************************************************
 * Create a OrderStorage Class that implements the IOrderStorage interface
 *****************************************************************************/
 pub class OrderStorage impl IOrderStorage {
  db: ex.Table;
  counter: cloud.Counter;
  new() {
    let orderProps = ex.TableProps{
      name: "OrdersTable",
      primaryKey: "id",

      columns: {
        id: ColumnType.STRING,
        prodId: ColumnType.STRING,
        qty: ColumnType.NUMBER,
        status: ColumnType.STRING
      }
    };
    this.db = new ex.Table(orderProps);
    this.counter = new cloud.Counter();
  }

  pub inflight add(name: str, productData: Json) {
    let id = "{this.counter.inc()}";
    this.db.insert(id, productData);
    
  }

  pub inflight remove(id: str) {
    this.db.delete(id);
    log("deleting product {id}");
  }

  pub inflight get(id: str): Order {
  let orderJson = this.db.tryGet(id);
      return Order.fromJson(orderJson);
  }

  pub inflight list(): Array<Json> {
  let orderJson = this.db.list();
      return orderJson;
  }

  pub inflight updateOrderStatus(id: str, userId: str, status: str) {
      let updatedItem = {
        status: status
      };
      this.db.update(id, updatedItem);
    }
}


/***************************************************
 * Create a OrderService Class with api endpoints
 ***************************************************/
pub class OrderService {
  pub api: cloud.Api;
  storage: IOrderStorage;
  prodStorage: product.IProductStorage;
  counter: cloud.Counter;
  queue: cloud.Queue;
  pub auth: basicAuth.BasicAuth;
  
  new(storage: IOrderStorage, prodStore: product.IProductStorage, queue: cloud.Queue, api:cloud.Api,auth: basicAuth.BasicAuth) {

  this.auth = auth;
    this.storage = storage;
    this.prodStorage = prodStore;
    this.counter = new cloud.Counter();
    this.queue = queue;
    this.api = api;

    // API endpoints
    this.api.post("/order/:id", inflight (req): cloud.ApiResponse => {
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
        let id = "{this.counter.inc()}";
        let userId = req.vars.get("id");
        let reqBody = Json.parse(req.body!);
        let orderedItems = reqBody.get("orderedItems");
        let orderQty = req.vars.get("qty");
        this.storage.add(id, {id: id, userId: userId, orderedItems: orderedItems, status: "PENDING"});
        log("Sending to queue");
        queue.push(Json.stringify({
                id: id,
                userId: userId,
                orderedItems: orderedItems
              }));
              log("Queue recieved");
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

    this.api.get("/order/:id", inflight (req): cloud.ApiResponse => {
        let id = req.vars.get("id");
        let order = this.storage.get(id);
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
          body: Json.stringify(order)
        };
    });

    this.api.get("/orders", inflight (req): cloud.ApiResponse => {
        let order = this.storage.list();
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
          body: Json.stringify(order)
        };
    });


/***************************************************
 * Setup a queue consumer
 ***************************************************/
    this.queue.setConsumer(inflight (message) => {
      let orderInfo = Json.parse(message);
      let id = orderInfo.get("id").asStr();
      let userId = orderInfo.get("userId").asStr();
      this.storage.updateOrderStatus(id, userId, "COMPLETED");
    }, timeout: 3s);
    
  }
}