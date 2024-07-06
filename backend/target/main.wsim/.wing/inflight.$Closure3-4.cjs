"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $handler, $routeKey }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      if ($helpers.eq(event.requestContext.routeKey, $routeKey)) {
        (await $handler(event.requestContext.connectionId, event.body));
      }
      return ({"statusCode": 200, "body": "ack"});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-4.cjs.map