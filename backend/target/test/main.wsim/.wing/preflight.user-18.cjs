"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
const http = $stdlib.http;
const User = $stdlib.std.Struct._createJsonSchema({$id:"/User",type:"object",properties:{dob:{type:"string"},email:{type:"string"},firstName:{type:"string"},id:{type:"string"},imageUrl:{type:"string"},lastName:{type:"string"},username:{type:"string"},},required:["dob","email","firstName","id","imageUrl","lastName","username",]});
const ColumnType =
  (function (tmp) {
    tmp["STRING"] = "STRING";
    tmp["NUMBER"] = "NUMBER";
    return tmp;
  })({})
;
class UserStorage extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    const tableProps = ({"name": "UsersTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "firstName": ColumnType.STRING, "lastName": ColumnType.STRING, "email": ColumnType.STRING, "username": ColumnType.STRING, "dob": ColumnType.STRING, "imageUrl": ColumnType.STRING})});
    this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", tableProps);
    this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.UserStorage-10.cjs")({
        $User: ${$stdlib.core.liftObject(User)},
        $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UserStorageClient = ${UserStorage._toInflightType()};
        const client = new UserStorageClient({
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
      "updateUser": [
        [this.db, [].concat(["tryGet"], ["update"])],
      ],
      "$inflight_init": [
        [this.counter, []],
        [this.db, []],
      ],
    });
  }
}
class UserService extends $stdlib.std.Resource {
  constructor($scope, $id, storage, api) {
    super($scope, $id);
    this.api = api;
    this.userStorage = storage;
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
            $__parent_this_1_userStorage: ${$stdlib.core.liftObject(__parent_this_1.userStorage)},
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
            [__parent_this_1.userStorage, ["add"]],
          ],
          "$inflight_init": [
            [__parent_this_1.userStorage, []],
          ],
        });
      }
    }
    (this.api.post("/user", new $Closure1(this, "$Closure1")));
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
            $__parent_this_2_userStorage: ${$stdlib.core.liftObject(__parent_this_2.userStorage)},
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
            [__parent_this_2.userStorage, ["get"]],
          ],
          "$inflight_init": [
            [__parent_this_2.userStorage, []],
          ],
        });
      }
    }
    (this.api.get("/user/:id", new $Closure2(this, "$Closure2")));
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
            $__parent_this_3_userStorage: ${$stdlib.core.liftObject(__parent_this_3.userStorage)},
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
            [__parent_this_3.userStorage, ["list"]],
          ],
          "$inflight_init": [
            [__parent_this_3.userStorage, []],
          ],
        });
      }
    }
    (this.api.get("/users", new $Closure3(this, "$Closure3")));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.UserService-10.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UserServiceClient = ${UserService._toInflightType()};
        const client = new UserServiceClient({
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
module.exports = { UserStorage, UserService };
//# sourceMappingURL=preflight.user-18.cjs.map