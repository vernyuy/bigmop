"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_clients }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(id) {
      (await $__parent_this_1_clients.put(id, ""));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-8.cjs.map