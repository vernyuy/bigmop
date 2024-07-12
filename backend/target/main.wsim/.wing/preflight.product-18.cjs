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
const Product = $stdlib.std.Struct._createJsonSchema({$id:"/Product",type:"object",properties:{categoryID:{type:"string"},createdAt:{type:"string"},description:{type:"string"},id:{type:"string"},imageUrl:{type:"string"},images:{type:"array",items:{type:"string"}},name:{type:"string"},price:{type:"number"},qty:{type:"number"},subCategoryID:{type:"string"},unit:{type:"string"},weight:{type:"number"},},required:["categoryID","createdAt","description","id","imageUrl","images","name","price","qty","subCategoryID","unit","weight",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
class ProductStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const tableProps = ({"name": "ProductsTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "name": ColumnType.STRING, "qty": ColumnType.NUMBER, "price": ColumnType.NUMBER, "imageUrl": ColumnType.STRING, "description": ColumnType.STRING, "unit": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.ProductStorage-10.cjs")({
        $Product: ${$stdlib.core.liftObject(Product)},
        $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const ProductStorageClient = ${ProductStorage._toInflightType()};
        const client = new ProductStorageClient({
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
      "updateProduct": [
        [this.db, [].concat(["tryGet"], ["update"])],
      ],
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class ProductService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, api, auth, broadcaster) {
    super($scope, $id);
    this.auth = auth;
    this.api = api;
    this.myBroadcaster = broadcaster;
    this.productStorage = storage;
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-10.cjs")({
            $__parent_this_1_myBroadcaster: ${$stdlib.core.liftObject(__parent_this_1.myBroadcaster)},
            $__parent_this_1_productStorage: ${$stdlib.core.liftObject(__parent_this_1.productStorage)},
            $auth: ${$stdlib.core.liftObject(auth)},
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
            [__parent_this_1.myBroadcaster, ["broadcast"]],
            [__parent_this_1.productStorage, ["add"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_1.myBroadcaster, []],
            [__parent_this_1.productStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.post("/product", new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-10.cjs")({
            $__parent_this_2_productStorage: ${$stdlib.core.liftObject(__parent_this_2.productStorage)},
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
            [__parent_this_2.productStorage, ["get"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_2.productStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/product/:id", new $Closure2(this, "$Closure2")));
    const __parent_this_3 = this;
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-10.cjs")({
            $__parent_this_3_productStorage: ${$stdlib.core.liftObject(__parent_this_3.productStorage)},
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
            [__parent_this_3.productStorage, ["list"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_3.productStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/products", new $Closure3(this, "$Closure3")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.ProductService-10.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const ProductServiceClient = ${ProductService._toInflightType()};
        const client = new ProductServiceClient({
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
module.exports = { ProductStorage, ProductService };
//# sourceMappingURL=preflight.product-18.cjs.map