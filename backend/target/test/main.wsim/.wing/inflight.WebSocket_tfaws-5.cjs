"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class WebSocket_tfaws {
    constructor({ $this_url }) {
      this.$this_url = $this_url;
    }
    static async _postToConnection(endpointUrl, connectionId, message) {
      return (require("../../../../../node_modules/@winglibs/websockets/inflight/websocket.aws.js")["_postToConnection"])(endpointUrl, connectionId, message)
    }
    async sendMessage(connectionId, message) {
      let url = this.$this_url;
      url = url.replace("wss://", "https://");
      (await WebSocket_tfaws._postToConnection(url, connectionId, message));
    }
  }
  return WebSocket_tfaws;
}
//# sourceMappingURL=inflight.WebSocket_tfaws-5.cjs.map