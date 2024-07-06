"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $http_Util, $std_Json }) {
  class WebSocket_sim {
    constructor({ $this_localStateKey, $this_state }) {
      this.$this_localStateKey = $this_localStateKey;
      this.$this_state = $this_state;
    }
    static async _startWebSocketApi(connectFn, disconnectFn, onmessageFn) {
      return (require("../../../../../node_modules/@winglibs/websockets/platform/sim/wb.js")["_startWebSocketApi"])(connectFn, disconnectFn, onmessageFn)
    }
    async sendMessage(connectionId, message) {
      const localUrl = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })((await this.$this_state.get(this.$this_localStateKey)));
      (await $http_Util.post(localUrl, { body: ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"connectionId": connectionId, "message": message})) }));
    }
  }
  return WebSocket_sim;
}
//# sourceMappingURL=inflight.WebSocket_sim-6.cjs.map