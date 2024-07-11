"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_categoryStorage, $__parent_this_1_myBroadcaster, $auth, $std_Json }) {
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
          const category = JSON.parse($helpers.unwrap(req.body));
          const id = (await $__parent_this_1_categoryStorage.add(category));
          (await $__parent_this_1_myBroadcaster.broadcast("refresh"));
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
//# sourceMappingURL=inflight.$Closure1-13.cjs.map