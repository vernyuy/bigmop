"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
module.exports = {
  get platform() { return require("./preflight.platform-14.cjs") },
  ...require("./preflight.lib-12.cjs"),
  get commons() { return require("./preflight.commons-7.cjs") },
};
//# sourceMappingURL=preflight.websockets-15.cjs.map