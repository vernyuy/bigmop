"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const expect = $stdlib.expect;
const vite = require("./preflight.vite-5.cjs");
const http = $stdlib.http;
const broadcaster = require("./preflight.broadcaster-16.cjs");
const product = require("./preflight.product-18.cjs");
const user = require("./preflight.user-19.cjs");
const order = require("./preflight.order-20.cjs");
const basicAuth = require("./preflight.auth-17.cjs");
const cloud = $stdlib.cloud;
const cart = require("./preflight.cart-21.cjs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Utils extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static __dirname() {
        return ($extern("../../../../utils.js")["__dirname"])()
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Utils-14.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const UtilsClient = ${Utils._toInflightType()};
            const client = new UtilsClient({
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-14.cjs")({
            $counter: ${$stdlib.core.liftObject(counter)},
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
            [counter, ["peek"]],
          ],
          "$inflight_init": [
            [counter, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-14.cjs")({
            $counter: ${$stdlib.core.liftObject(counter)},
            $myBroadcaster: ${$stdlib.core.liftObject(myBroadcaster)},
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
            [counter, ["inc"]],
            [myBroadcaster, ["broadcast"]],
          ],
          "$inflight_init": [
            [counter, []],
            [myBroadcaster, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-14.cjs")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $counter: ${$stdlib.core.liftObject(counter)},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
            [api.url, []],
            [counter, ["peek"]],
          ],
          "$inflight_init": [
            [api.url, []],
            [counter, []],
          ],
        });
      }
    }
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
    const myBroadcaster = new broadcaster.Broadcaster(this, "Broadcaster");
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api", { cors: true });
    const counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
    const auth = new basicAuth.BasicAuth(this, "BasicAuth");
    const productStorage = new product.ProductStorage(this, "ProductStorage");
    const productApi = new product.ProductService(this, "ProductService", productStorage, api, auth, myBroadcaster);
    const userStorage = new user.UserStorage(this, "UserStorage");
    const userService = new user.UserService(this, "UserService", userStorage, api, auth);
    const orderStorage = new order.OrderStorage(this, "OrderStorage");
    const orderApi = new order.OrderService(this, "OrderService", orderStorage, productStorage, queue, api, auth);
    const website = new vite.Vite(this, "Vite Website", { root: String.raw({ raw: ["", "/../frontend"] }, (Utils.__dirname())), publicEnv: ({"TITLE": "Wing + Vite + React", "API_URL": api.url, "WS_URL": myBroadcaster.url}) });
    (api.get("/counter", new $Closure1(this, "$Closure1")));
    (api.post("/counter", new $Closure2(this, "$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:api counter increment and get", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map