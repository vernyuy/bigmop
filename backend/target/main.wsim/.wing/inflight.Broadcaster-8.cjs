"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Broadcaster {
    constructor({ $this_clients, $this_server }) {
      this.$this_clients = $this_clients;
      this.$this_server = $this_server;
    }
    async broadcast(messgae) {
      for (const id of (await this.$this_clients.list())) {
        (await this.$this_server.sendMessage(id, messgae));
      }
    }
  }
  return Broadcaster;
}
//# sourceMappingURL=inflight.Broadcaster-8.cjs.map