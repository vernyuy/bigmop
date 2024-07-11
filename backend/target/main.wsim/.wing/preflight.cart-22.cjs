"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
const http = $stdlib.http;
const Cart = $stdlib.std.Struct._createJsonSchema({$id:"/Cart",type:"object",properties:{cartname:{type:"string"},dob:{type:"string"},email:{type:"string"},firstName:{type:"string"},id:{type:"string"},imageUrl:{type:"string"},lastName:{type:"string"},},required:["cartname","dob","email","firstName","id","imageUrl","lastName",]});
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
    const tableProps = ({"name": "CartsTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "firstName": ColumnType.STRING, "lastName": ColumnType.STRING, "email": ColumnType.STRING, "cartname": ColumnType.STRING, "dob": ColumnType.STRING, "imageUrl": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CartStorage-14.cjs")({
        $Cart: ${$stdlib.core.liftObject(Cart)},
        $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
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
      "add": [
        [this, ["_add"]],
        [this.counter, ["inc"]],
      ],
      "remove": [
        [this.db, ["delete"]],
      ],
      "get": [
        [this.db, ["tryGet"]],
      ],
      "list": [
        [this.db, ["list"]],
      ],
      "updateCart": [
        [this.db, [].concat(["tryGet"], ["update"])],
      ],
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class CartService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, api) {
    super($scope, $id);
    this.api = api;
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-14.cjs")({
            $__parent_this_1_cartStorage: ${$stdlib.core.liftObject(__parent_this_1.cartStorage)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
            [__parent_this_1.cartStorage, ["add"]],
          ],
          "$inflight_init": [
            [__parent_this_1.cartStorage, []],
          ],
        });
      }
    }
    (this.api.post("/cart", new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-14.cjs")({
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
            [__parent_this_2.cartStorage, ["get"]],
          ],
          "$inflight_init": [
            [__parent_this_2.cartStorage, []],
          ],
        });
      }
    }
    (this.api.get("/cart/:id", new $Closure2(this, "$Closure2")));
    const __parent_this_3 = this;
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-14.cjs")({
            $__parent_this_3_cartStorage: ${$stdlib.core.liftObject(__parent_this_3.cartStorage)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
            [__parent_this_3.cartStorage, ["list"]],
          ],
          "$inflight_init": [
            [__parent_this_3.cartStorage, []],
          ],
        });
      }
    }
    (this.api.get("/carts", new $Closure3(this, "$Closure3")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CartService-14.cjs")({
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
//# sourceMappingURL=preflight.cart-22.cjs.map