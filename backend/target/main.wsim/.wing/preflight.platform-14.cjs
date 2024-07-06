"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
module.exports = {
  ...require("./preflight.tfaws-10.cjs"),
  ...require("./preflight.sim-11.cjs"),
  ...require("./preflight.awscdk-9.cjs"),
  get aws() { return require("./preflight.aws-13.cjs") },
};
//# sourceMappingURL=preflight.platform-14.cjs.map