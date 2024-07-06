"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
const http = $stdlib.http;
const expect = $stdlib.expect;
const product = require("./preflight.product-18.cjs");
const basicAuth = require("./preflight.auth-17.cjs");
const Order = $stdlib.std.Struct._createJsonSchema({$id:"/Order",type:"object",properties:{id:{type:"string"},productId:{type:"string"},qty:{type:"number"},status:{type:"string"},},required:["id","productId","qty","status",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
const OrderStatus =
  (function (tmp) {
    tmp["PENDING"] = "PENDING";
    tmp["PROCESSING"] = "PROCESSING";
    tmp["COMPLETED"] = "COMPLETED";
    return tmp;
  })({})
;
class OrderStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const orderProps = ({"name": "OrdersTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "prodId": ColumnType.STRING, "qty": ColumnType.NUMBER, "status": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", orderProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.OrderStorage-12.cjs")({
        $Order: ${$stdlib.core.liftObject(Order)},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const OrderStorageClient = ${OrderStorage._toInflightType()};
        const client = new OrderStorageClient({
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
      "add": [
        [this.counter, ["inc"]],
        [this.db, ["insert"]],
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
      "updateOrderStatus": [
        [this.db, ["update"]],
      ],
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class OrderService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, prodStore, queue, api, auth) {
    super($scope, $id);
    this.auth = auth;
    this.storage = storage;
    this.prodStorage = prodStore;
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
    this.queue = queue;
    this.api = api;
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-12.cjs")({
            $__parent_this_1_counter: ${$stdlib.core.liftObject(__parent_this_1.counter)},
            $__parent_this_1_storage: ${$stdlib.core.liftObject(__parent_this_1.storage)},
            $auth: ${$stdlib.core.liftObject(auth)},
            $queue: ${$stdlib.core.liftObject(queue)},
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
            [__parent_this_1.counter, ["inc"]],
            [__parent_this_1.storage, ["add"]],
            [auth, ["call"]],
            [queue, ["push"]],
          ],
          "$inflight_init": [
            [__parent_this_1.counter, []],
            [__parent_this_1.storage, []],
            [auth, []],
            [queue, []],
          ],
        });
      }
    }
    (this.api.post("/order/:id/:qty", new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-12.cjs")({
            $__parent_this_2_storage: ${$stdlib.core.liftObject(__parent_this_2.storage)},
            $auth: ${$stdlib.core.liftObject(auth)},
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
            [__parent_this_2.storage, ["get"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_2.storage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/order/:id", new $Closure2(this, "$Closure2")));
    const __parent_this_3 = this;
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-12.cjs")({
            $__parent_this_3_storage: ${$stdlib.core.liftObject(__parent_this_3.storage)},
            $auth: ${$stdlib.core.liftObject(auth)},
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
            [__parent_this_3.storage, ["list"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_3.storage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/orders", new $Closure3(this, "$Closure3")));
    const __parent_this_4 = this;
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-12.cjs")({
            $__parent_this_4_prodStorage: ${$stdlib.core.liftObject(__parent_this_4.prodStorage)},
            $__parent_this_4_storage: ${$stdlib.core.liftObject(__parent_this_4.storage)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
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
            [__parent_this_4.prodStorage, ["updateProduct"]],
            [__parent_this_4.storage, ["updateOrderStatus"]],
          ],
          "$inflight_init": [
            [__parent_this_4.prodStorage, []],
            [__parent_this_4.storage, []],
          ],
        });
      }
    }
    (this.queue.setConsumer(new $Closure4(this, "$Closure4"), { timeout: (std.Duration.fromSeconds(3)) }));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.OrderService-12.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const OrderServiceClient = ${OrderService._toInflightType()};
        const client = new OrderServiceClient({
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
module.exports = { OrderStorage, OrderService };
//# sourceMappingURL=preflight.order-20.cjs.map