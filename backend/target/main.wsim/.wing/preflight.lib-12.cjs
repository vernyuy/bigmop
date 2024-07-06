"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const util = $stdlib.util;
const cloud = $stdlib.cloud;
const ui = $stdlib.ui;
const api = require("./preflight.api-6.cjs");
const awscdk = require("./preflight.awscdk-9.cjs");
const tfaws = require("./preflight.tfaws-10.cjs");
const sim = require("./preflight.sim-11.cjs");
class WebSocket extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    const target = (util.Util.env("WING_TARGET"));
    if ($helpers.eq(target, "tf-aws")) {
      const ws = new tfaws.WebSocket_tfaws(this, props.name, props);
      this.url = ws.url;
      this.inner = ws;
    }
    else if ($helpers.eq(target, "awscdk")) {
      const ws = new awscdk.WebSocket_awscdk(this, props.name, props);
      this.url = ws.url;
      this.inner = ws;
    }
    else if ($helpers.eq(target, "sim")) {
      const ws = new sim.WebSocket_sim(this, props.name, props);
      this.url = ws.url;
      this.inner = ws;
    }
    else {
      throw new Error(String.raw({ raw: ["unsupported target ", ""] }, target));
    }
    const inner = $helpers.nodeof(this.inner);
    inner.hidden = true;
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-7.cjs")({
            $__parent_this_1_url: ${$stdlib.core.liftObject(__parent_this_1.url)},
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
            [__parent_this_1.url, []],
          ],
          "$inflight_init": [
            [__parent_this_1.url, []],
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.ui.Field", ui.Field, this, "Field", "url", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.cloud.Endpoint", cloud.Endpoint, this, "Endpoint", this.url);
  }
  onConnect(handler) {
    (this.inner.onConnect(handler));
  }
  onDisconnect(handler) {
    (this.inner.onDisconnect(handler));
  }
  onMessage(handler) {
    (this.inner.onMessage(handler));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.WebSocket-7.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WebSocketClient = ${WebSocket._toInflightType()};
        const client = new WebSocketClient({
          $this_inner: ${$stdlib.core.liftObject(this.inner)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "sendMessage": [
        [this.inner, ["sendMessage"]],
      ],
      "$inflight_init": [
        [this.inner, []],
      ],
    });
  }
}
module.exports = { WebSocket };
//# sourceMappingURL=preflight.lib-12.cjs.map