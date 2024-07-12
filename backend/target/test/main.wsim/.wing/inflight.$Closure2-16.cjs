"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_2_notificationStorage, $auth, $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const id = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "id");
      const notification = (await $__parent_this_2_notificationStorage.get(id));
      const authenticated = (await $auth.call(req));
      if ((!authenticated)) {
        return ({"status": 401, "headers": ({["Content-Type"]: "text/plain"}), "body": "Unauthorized"});
      }
      return ({"status": 200, "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(notification)});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-16.cjs.map