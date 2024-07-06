"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $apiUrl, $expect_Util, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["", "/hello"] }, $apiUrl)));
      (await $expect_Util.equal(response.status, 401));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map