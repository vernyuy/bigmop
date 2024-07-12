"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_cartStorage, $std_Json, $std_Number }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {
        const $if_let_value = req.body;
        if ($if_let_value != undefined) {
          const body = $if_let_value;
          const cart = JSON.parse($helpers.unwrap(req.body));
          const productId = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "productId");
          const userId = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "userId");
          const qty = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "qty");
          const productQty = (await $std_Number.fromJson(qty));
          const id = (await $__parent_this_1_cartStorage.addItemToCart(productId, userId, productQty));
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
//# sourceMappingURL=inflight.$Closure1-15.cjs.map