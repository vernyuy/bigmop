"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_3_notificationStorage, $auth, $std_Json }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const notifications = (await $__parent_this_3_notificationStorage.list());
      const authenticated = (await $auth.call(req));
      if ((!authenticated)) {
        return ({"status": 401, "headers": ({["Content-Type"]: "text/plain"}), "body": "Unauthorized"});
      }
      return ({"status": 200, "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"items": notifications}))});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-16.cjs.map