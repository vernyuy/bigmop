"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json, $util_Util }) {
  class BasicAuth {
    constructor({ $this_password, $this_user }) {
      this.$this_password = $this_password;
      this.$this_user = $this_user;
    }
    async call(req) {
      try {
        const authHeader = (await this.authHeader(req.headers));
        const credentials = (await this.authCredentials(authHeader));
        const username = credentials.username;
        const password = credentials.password;
        return ($helpers.eq(username, this.$this_user) && $helpers.eq(password, this.$this_password));
      }
      catch ($error_e) {
        const e = $error_e.message;
        console.log(String.raw({ raw: ["exception caught ", ""] }, e));
        return false;
      }
    }
    async authCredentials(header) {
      const auth = (await $util_Util.base64Decode(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((await header.split(" ")), 1)));
      const splittedAuth = (await auth.split(":"));
      const username = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(splittedAuth, 0);
      const password = ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(splittedAuth, 1);
      return ({"username": username, "password": password});
    }
    async authHeader(headers) {
      if ((await this.authHeaderPresent(headers))) {
        const authHeaderOptional = (headers)["authorization"];
        let authHeader = (headers)["Authorization"];
        if ($helpers.eq(authHeader, undefined)) {
          authHeader = authHeaderOptional;
        }
        return String.raw({ raw: ["", ""] }, (authHeader ?? "test"));
      }
      else {
        console.log(String.raw({ raw: ["headers: ", ""] }, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(headers)));
        console.log("no auth header");
        throw new Error("no auth header");
      }
    }
    async authHeaderPresent(headers) {
      if (($helpers.eq(("authorization" in (headers)), false) && $helpers.eq(("Authorization" in (headers)), false))) {
        return false;
      }
      return true;
    }
  }
  return BasicAuth;
}
//# sourceMappingURL=inflight.BasicAuth-1.cjs.map