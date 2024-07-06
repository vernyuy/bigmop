"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_2_clients }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(id) {
      (await $__parent_this_2_clients.delete(id));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-8.cjs.map