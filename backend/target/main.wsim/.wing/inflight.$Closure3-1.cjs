"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $apiUrl, $expect_Util, $http_Util, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["", "/hello"] }, $apiUrl), ({"headers": ({"Accept": "application/json", "Authorization": ("Basic " + (await $util_Util.base64Encode("admin:admin")))})})));
      (await $expect_Util.equal(response.status, 200));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map