"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const websockets = require("./preflight.websockets-15.cjs");
const ui = $stdlib.ui;
class Broadcaster extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.server = new websockets.WebSocket(this, "counter_updates", { name: "counter_updates" });
    this.url = this.server.url;
    this.clients = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-8.cjs")({
            $__parent_this_1_clients: ${$stdlib.core.liftObject(__parent_this_1.clients)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [__parent_this_1.clients, ["put"]],
          ],
          "$inflight_init": [
            [__parent_this_1.clients, []],
          ],
        });
      }
    }
    (this.server.onConnect(new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-8.cjs")({
            $__parent_this_2_clients: ${$stdlib.core.liftObject(__parent_this_2.clients)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [__parent_this_2.clients, ["delete"]],
          ],
          "$inflight_init": [
            [__parent_this_2.clients, []],
          ],
        });
      }
    }
    (this.server.onDisconnect(new $Closure2(this, "$Closure2")));
    $helpers.nodeof(this.server).hidden = true;
    $helpers.nodeof(this.clients).hidden = true;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Broadcaster-8.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BroadcasterClient = ${Broadcaster._toInflightType()};
        const client = new BroadcasterClient({
          $this_clients: ${$stdlib.core.liftObject(this.clients)},
          $this_server: ${$stdlib.core.liftObject(this.server)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "broadcast": [
        [this.clients, ["list"]],
        [this.server, ["sendMessage"]],
      ],
      "$inflight_init": [
        [this.clients, []],
        [this.server, []],
      ],
    });
  }
}
module.exports = { Broadcaster };
//# sourceMappingURL=preflight.broadcaster-16.cjs.map