"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_3_cartStorage, $std_Json }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const carts = (await $__parent_this_3_cartStorage.list());
      return ({"status": 200, "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"items": carts}))});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-15.cjs.map