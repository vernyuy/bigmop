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
const Category = $stdlib.std.Struct._createJsonSchema({$id:"/Category",type:"object",properties:{description:{type:"string"},id:{type:"string"},name:{type:"string"},},required:["description","id","name",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
class CategoryStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const tableProps = ({"name": "CategoriesTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "name": ColumnType.STRING, "description": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CategoryStorage-13.cjs")({
        $Category: ${$stdlib.core.liftObject(Category)},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const CategoryStorageClient = ${CategoryStorage._toInflightType()};
        const client = new CategoryStorageClient({
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
class CategoryService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, api, auth, broadcaster) {
    super($scope, $id);
    this.auth = auth;
    this.api = api;
    this.myBroadcaster = broadcaster;
    this.categoryStorage = storage;
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-13.cjs")({
            $__parent_this_1_categoryStorage: ${$stdlib.core.liftObject(__parent_this_1.categoryStorage)},
            $__parent_this_1_myBroadcaster: ${$stdlib.core.liftObject(__parent_this_1.myBroadcaster)},
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
            [__parent_this_1.categoryStorage, ["add"]],
            [__parent_this_1.myBroadcaster, ["broadcast"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_1.categoryStorage, []],
            [__parent_this_1.myBroadcaster, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.post("/categories", new $Closure1(this, "$Closure1")));
    const __parent_this_2 = this;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-13.cjs")({
            $__parent_this_2_categoryStorage: ${$stdlib.core.liftObject(__parent_this_2.categoryStorage)},
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
            [__parent_this_2.categoryStorage, ["get"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_2.categoryStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/category/:id", new $Closure2(this, "$Closure2")));
    const __parent_this_3 = this;
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-13.cjs")({
            $__parent_this_3_categoryStorage: ${$stdlib.core.liftObject(__parent_this_3.categoryStorage)},
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
            [__parent_this_3.categoryStorage, ["list"]],
            [auth, ["call"]],
          ],
          "$inflight_init": [
            [__parent_this_3.categoryStorage, []],
            [auth, []],
          ],
        });
      }
    }
    (this.api.get("/categories", new $Closure3(this, "$Closure3")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.CategoryService-13.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const CategoryServiceClient = ${CategoryService._toInflightType()};
        const client = new CategoryServiceClient({
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
module.exports = { CategoryStorage, CategoryService };
//# sourceMappingURL=preflight.categories-21.cjs.map