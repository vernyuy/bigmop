bring expect;
bring vite;
bring http;
bring "./broadcaster.w" as broadcaster;
bring "./product.w" as product;
bring "./user.w" as user;
bring "./order.w" as order;
bring "./auth.w" as basicAuth;
bring cloud;
bring "./cart.w" as cart;

let queue = new cloud.Queue();


// api.get("/hello", inflight (req) => {

// });

// let apiUrl = api.url;

// test "not authenticated" {
//   let response = http.get("{apiUrl}/hello");
//   expect.equal(response.status, 401);
// }

// test "authenticated" {
//   let response = http.get("{apiUrl}/hello", {
//     headers: {
//       Accept: "application/json",
//       Authorization: "Basic " + util.base64Encode("admin:admin")
//     }
//   });

//   expect.equal(response.status, 200);
// }
///////

class Utils {
  extern "utils.js" pub static __dirname(): str;
}

let myBroadcaster = new broadcaster.Broadcaster() as "Broadcaster";
let api = new cloud.Api(cors: true);
let counter = new cloud.Counter();
let auth = new basicAuth.BasicAuth();


let productStorage = new product.ProductStorage();
let productApi = new product.ProductService(productStorage, api, auth, myBroadcaster);
let userStorage = new user.UserStorage();
let userService = new user.UserService(userStorage, api, auth);
let orderStorage = new order.OrderStorage();
let orderApi = new order.OrderService(orderStorage, productStorage, queue, api, auth);

let website = new vite.Vite(
  root: "{Utils.__dirname()}/../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    API_URL: api.url,
    WS_URL: myBroadcaster.url
  }
) as "Vite Website"; 

api.get("/counter", inflight () => {
  return {
    body: "{counter.peek()}"
  };
});

api.post("/counter", inflight () => {
  let prev = counter.inc();
  myBroadcaster.broadcast("refresh");
  return {
    body: "{prev + 1}"
  };
});

test "api counter increment and get" {
  log("counter initial value: {counter.peek()}");
  assert(counter.peek() == 0);
  http.post(api.url + "/counter");
  let res = http.get(api.url + "/counter");
  log("counter value after increment: {res.body}");
  assert(res.body == "1");
}
