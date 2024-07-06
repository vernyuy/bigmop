"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class WebSocket {
    constructor({ $this_inner }) {
      this.$this_inner = $this_inner;
    }
    async sendMessage(connectionId, message) {
      (await this.$this_inner.sendMessage(connectionId, message));
    }
  }
  return WebSocket;
}
//# sourceMappingURL=inflight.WebSocket-7.cjs.map