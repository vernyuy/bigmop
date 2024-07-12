"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_4_storage, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(message) {
      const orderInfo = JSON.parse(message);
      const id = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(orderInfo, "id"));
      const userId = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(orderInfo, "userId"));
      (await $__parent_this_4_storage.updateOrderStatus(id, userId, "COMPLETED"));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-12.cjs.map