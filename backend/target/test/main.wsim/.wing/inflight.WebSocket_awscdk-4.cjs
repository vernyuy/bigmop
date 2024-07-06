"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class WebSocket_awscdk {
    constructor({ $this_url }) {
      this.$this_url = $this_url;
    }
    static async _postToConnection(endpointUrl, connectionId, message) {
      return (require("../../../../../node_modules/@winglibs/websockets/inflight/websocket.aws.js")["_postToConnection"])(endpointUrl, connectionId, message)
    }
    async sendMessage(connectionId, message) {
      (await WebSocket_awscdk._postToConnection(this.$this_url.replace("wss://", "https://"), connectionId, message));
    }
  }
  return WebSocket_awscdk;
}
//# sourceMappingURL=inflight.WebSocket_awscdk-4.cjs.map