"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
const expect = $stdlib.expect;
class BasicAuth extends $stdlib.std.Resource {
  constructor($scope, $id, user, password) {
    super($scope, $id);
    this.user = (user ?? "admin");
    this.password = (password ?? "admin");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.BasicAuth-9.cjs")({
        $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
        $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BasicAuthClient = ${BasicAuth._toInflightType()};
        const client = new BasicAuthClient({
          $this_password: ${$stdlib.core.liftObject(this.password)},
          $this_user: ${$stdlib.core.liftObject(this.user)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "call": [
        [this, [].concat(["authHeader"], ["authCredentials"])],
        [this.password, []],
        [this.user, []],
      ],
      "authCredentials": [
      ],
      "authHeader": [
        [this, ["authHeaderPresent"]],
      ],
      "authHeaderPresent": [
      ],
      "$inflight_init": [
        [this.password, []],
        [this.user, []],
      ],
    });
  }
}
module.exports = { BasicAuth };
//# sourceMappingURL=preflight.auth-17.cjs.map