"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const sim = $stdlib.sim;
const util = $stdlib.util;
const fs = $stdlib.fs;
const ui = $stdlib.ui;
const vite_types = require("./preflight.vitetypes-1.cjs");
const vite_sim = require("./preflight.vitesim-2.cjs");
const vite_tf_aws = require("./preflight.vitetfaws-3.cjs");
class Vite extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    const target = (util.Util.env("WING_TARGET"));
    if ($helpers.eq(target, "sim")) {
      const implementation = new vite_sim.Vite_sim(this, "Vite_sim", props);
      $helpers.nodeof(implementation).hidden = true;
      this.url = implementation.url;
    }
    else if ($helpers.eq(target, "tf-aws")) {
      const implementation = new vite_tf_aws.Vite_tf_aws(this, "Vite_tf_aws", props);
      $helpers.nodeof(implementation).hidden = true;
      this.url = implementation.url;
    }
    else {
      throw new Error(String.raw({ raw: ["Unsupported WING_TARGET $", ""] }, target));
    }
    this.node.root.new("@winglang/sdk.cloud.Endpoint", cloud.Endpoint, this, "Endpoint", this.url);
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.cjs")({
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
    this.node.root.new("@winglang/sdk.ui.Field", ui.Field, this, "Field", "URL", new $Closure1(this, "$Closure1"));
    $helpers.nodeof(this).color = "violet";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Vite-3.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const ViteClient = ${Vite._toInflightType()};
        const client = new ViteClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { Vite };
//# sourceMappingURL=preflight.vite-4.cjs.map