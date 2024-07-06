"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $WebSocket_sim, $__parent_this_4_connectFn, $__parent_this_4_disconnectFn, $__parent_this_4_localStateKey, $__parent_this_4_messageFn, $__parent_this_4_state, $__parent_this_4_urlStateKey }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const res = (await $WebSocket_sim._startWebSocketApi($__parent_this_4_connectFn, $__parent_this_4_disconnectFn, $__parent_this_4_messageFn));
      (await $__parent_this_4_state.set($__parent_this_4_urlStateKey, (await res.url())));
      (await $__parent_this_4_state.set($__parent_this_4_localStateKey, (await res.local())));
      return (async () => {
        (await res.close());
      });
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-6.cjs.map