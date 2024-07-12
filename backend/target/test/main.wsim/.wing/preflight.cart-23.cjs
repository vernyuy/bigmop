"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
const http = $stdlib.http;
const basicAuth = require("./preflight.auth-17.cjs");
const broadcaster = require("./preflight.broadcaster-16.cjs");
const product = require("./preflight.product-18.cjs");
const Cart = $stdlib.std.Struct._createJsonSchema({$id:"/Cart",type:"object",properties:{createdAt:{type:"string"},id:{type:"string"},productId:{type:"string"},qty:{type:"number"},status:{type:"string"},userId:{type:"string"},},required:["createdAt","id","productId","qty","status","userId",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
class CartStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const tableProps = ({"name": "CartsTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "productId": ColumnType.STRING, "status": ColumnType.STRING, "qty": ColumnType.NUMBER})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CartStorage-15.cjs")({
        $Cart: ${$stdlib.core.liftObject(Cart)},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const CartStorageClient = ${CartStorage._toInflightType()};
        const client = new CartStorageClient({
          $this_counter: ${$stdlib.core.liftObject(this.counter)},
          $this_db: ${$stdlib.core.liftObject(this.db)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "_add": [
        [this.db, ["insert"]],
      ],
      "addItemToCart": [
        [this, ["_add"]],
        [this.counter, ["inc"]],
      ],
      "remove": [
        [this.db, ["delete"]],
      ],
      "getCartItem": [
        [this.db, ["tryGet"]],
      ],
      "updateCartStatus": [
        [this.db, [].concat(["tryGet"], ["update"])],
      ],
      "updateCartProductQuantity": [
        [this.db, ["tryGet"]],
      ],
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class CartService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, prodStore, api, auth, broadcaster) {
    super($scope, $id);
    this.auth = auth;
    this.api = api;
    this.myBroadcaster = broadcaster;
    this.prodStorage = prodStore;
    this.cartStorage = storage;
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-15.cjs")({
            $__parent_this_1_cartStorage: ${$stdlib.core.liftObject(__parent_this_1.cartStorage)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
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
            [__parent_this_1.cartStorage, ["addItemToCart"]],
          ],
          "$inflight_init": [
            [__parent_this_1.cartStorage, []],
          ],
        });
      }
    }
    (this.api.post("/cart/:productId/:userId/:qty", new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-15.cjs")({
            $__parent_this_2_cartStorage: ${$stdlib.core.liftObject(__parent_this_2.cartStorage)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
            [__parent_this_2.cartStorage, ["getCartItem"]],
          ],
          "$inflight_init": [
            [__parent_this_2.cartStorage, []],
          ],
        });
      }
    }
    (this.api.get("/cart/:id/:userId", new $Closure2(this, "$Closure2")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CartService-15.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const CartServiceClient = ${CartService._toInflightType()};
        const client = new CartServiceClient({
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
module.exports = { CartStorage, CartService };
//# sourceMappingURL=preflight.cart-23.cjs.map