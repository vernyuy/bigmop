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
const SubCategory = $stdlib.std.Struct._createJsonSchema({$id:"/SubCategory",type:"object",properties:{description:{type:"string"},id:{type:"string"},name:{type:"string"},parentSubCategory:{type:"string"},},required:["description","id","name","parentSubCategory",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
class SubCategoryStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const tableProps = ({"name": "CategoriesTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "name": ColumnType.STRING, "description": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.SubCategoryStorage-14.cjs")({
        $SubCategory: ${$stdlib.core.liftObject(SubCategory)},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const SubCategoryStorageClient = ${SubCategoryStorage._toInflightType()};
        const client = new SubCategoryStorageClient({
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
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class SubCategoryService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, prodStore, api, auth, broadcaster) {
    super($scope, $id);
    this.auth = auth;
    this.api = api;
    this.myBroadcaster = broadcaster;
    this.prodStorage = prodStore;
    this.subSubCategoryStorage = storage;
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
            $__parent_this_1_myBroadcaster: ${$stdlib.core.liftObject(__parent_this_1.myBroadcaster)},
            $__parent_this_1_subSubCategoryStorage: ${$stdlib.core.liftObject(__parent_this_1.subSubCategoryStorage)},
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
            [__parent_this_1.subSubCategoryStorage, ["add"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_1.myBroadcaster, []],
            [__parent_this_1.subSubCategoryStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.post("/subCategories", new $Closure1(this, "$Closure1")));
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
            $__parent_this_2_subSubCategoryStorage: ${$stdlib.core.liftObject(__parent_this_2.subSubCategoryStorage)},
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
            [__parent_this_2.subSubCategoryStorage, ["get"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_2.subSubCategoryStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/subSubCategory/:id", new $Closure2(this, "$Closure2")));
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
            $__parent_this_3_subSubCategoryStorage: ${$stdlib.core.liftObject(__parent_this_3.subSubCategoryStorage)},
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
            [__parent_this_3.subSubCategoryStorage, ["list"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_3.subSubCategoryStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/subCategories", new $Closure3(this, "$Closure3")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.SubCategoryService-14.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const SubCategoryServiceClient = ${SubCategoryService._toInflightType()};
        const client = new SubCategoryServiceClient({
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
module.exports = { SubCategoryStorage, SubCategoryService };
//# sourceMappingURL=preflight.subCategories-22.cjs.map