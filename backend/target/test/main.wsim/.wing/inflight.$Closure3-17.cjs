"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url, $counter, $http_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      console.log(String.raw({ raw: ["counter initial value: ", ""] }, (await $counter.peek())));
      $helpers.assert($helpers.eq((await $counter.peek()), 0), "counter.peek() == 0");
      (await $http_Util.post(($api_url + "/counter")));
      const res = (await $http_Util.get(($api_url + "/counter")));
      console.log(String.raw({ raw: ["counter value after increment: ", ""] }, res.body));
      $helpers.assert($helpers.eq(res.body, "1"), "res.body == \"1\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-17.cjs.map