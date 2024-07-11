"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $counter, $myBroadcaster }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const prev = (await $counter.inc());
      (await $myBroadcaster.broadcast("refresh"));
      return ({"body": String.raw({ raw: ["", ""] }, (prev + 1))});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-16.cjs.map