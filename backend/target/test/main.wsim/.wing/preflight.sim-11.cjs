"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const sim = $stdlib.sim;
const http = $stdlib.http;
const api = require("./preflight.api-6.cjs");
class WebSocket_sim extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-6.cjs")({
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    this.connectFn = new $Closure1(this, "$Closure1");
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-6.cjs")({
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    this.disconnectFn = new $Closure2(this, "$Closure2");
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-6.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    this.messageFn = new $Closure3(this, "$Closure3");
    this.state = this.node.root.new("@winglang/sdk.sim.State", sim.State, this, "State");
    this.urlStateKey = "url";
    this.localStateKey = "local";
    this.url = (this.state.token(this.urlStateKey));
    const __parent_this_4 = this;
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-6.cjs")({
            $WebSocket_sim: ${$stdlib.core.liftObject(WebSocket_sim)},
            $__parent_this_4_connectFn: ${$stdlib.core.liftObject(__parent_this_4.connectFn)},
            $__parent_this_4_disconnectFn: ${$stdlib.core.liftObject(__parent_this_4.disconnectFn)},
            $__parent_this_4_localStateKey: ${$stdlib.core.liftObject(__parent_this_4.localStateKey)},
            $__parent_this_4_messageFn: ${$stdlib.core.liftObject(__parent_this_4.messageFn)},
            $__parent_this_4_state: ${$stdlib.core.liftObject(__parent_this_4.state)},
            $__parent_this_4_urlStateKey: ${$stdlib.core.liftObject(__parent_this_4.urlStateKey)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [WebSocket_sim, ["_startWebSocketApi"]],
            [__parent_this_4.connectFn, ["handle"]],
            [__parent_this_4.disconnectFn, ["handle"]],
            [__parent_this_4.localStateKey, []],
            [__parent_this_4.messageFn, ["handle"]],
            [__parent_this_4.state, ["set"]],
            [__parent_this_4.urlStateKey, []],
          ],
          "$inflight_init": [
            [WebSocket_sim, []],
            [__parent_this_4.connectFn, []],
            [__parent_this_4.disconnectFn, []],
            [__parent_this_4.localStateKey, []],
            [__parent_this_4.messageFn, []],
            [__parent_this_4.state, []],
            [__parent_this_4.urlStateKey, []],
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "Service", new $Closure4(this, "$Closure4"));
  }
  onConnect(handler) {
    this.connectFn = handler;
  }
  onDisconnect(handler) {
    this.disconnectFn = handler;
  }
  onMessage(handler) {
    this.messageFn = handler;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.WebSocket_sim-6.cjs")({
        $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
        $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WebSocket_simClient = ${WebSocket_sim._toInflightType()};
        const client = new WebSocket_simClient({
          $this_localStateKey: ${$stdlib.core.liftObject(this.localStateKey)},
          $this_state: ${$stdlib.core.liftObject(this.state)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "sendMessage": [
        [this.localStateKey, []],
        [this.state, ["get"]],
      ],
      "$inflight_init": [
        [this.localStateKey, []],
        [this.state, []],
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "_startWebSocketApi": [
      ],
    });
  }
}
module.exports = { WebSocket_sim };
//# sourceMappingURL=preflight.sim-11.cjs.map