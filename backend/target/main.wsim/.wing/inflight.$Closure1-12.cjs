"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_counter, $__parent_this_1_storage, $auth, $queue, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const authenticated = (await $auth.call(req));
      if ((!authenticated)) {
        return ({"status": 401, "headers": ({["Content-Type"]: "text/plain"}), "body": "Unauthorized"});
      }
      {
        const $if_let_value = req.body;
        if ($if_let_value != undefined) {
          const body = $if_let_value;
          const id = String.raw({ raw: ["", ""] }, (await $__parent_this_1_counter.inc()));
          const userId = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "userId");
          const reqBody = JSON.parse($helpers.unwrap(req.body));
          const orderedItems = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(reqBody, "orderedItems");
          const orderQty = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "qty");
          (await $__parent_this_1_storage.add(id, ({"id": id, "userId": userId, "orderedItems": orderedItems, "status": "PENDING"})));
          console.log("Sending to queue");
          (await $queue.push(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"id": id, "userId": userId, "orderedItems": orderedItems}))));
          console.log("Queue recieved");
          return ({"status": 201, "body": id});
        }
        else {
          return ({"status": 400});
        }
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-12.cjs.map