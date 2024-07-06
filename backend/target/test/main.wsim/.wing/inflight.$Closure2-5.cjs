"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $handler, $routeKey }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      if ($helpers.eq(event.requestContext.routeKey, $routeKey)) {
        (await $handler(event.requestContext.connectionId));
      }
      return ({"statusCode": 200, "body": "ack"});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-5.cjs.map