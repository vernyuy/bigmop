"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
module.exports = {
  ...require("./preflight.vite-4.cjs"),
  ...require("./preflight.vitetfaws-3.cjs"),
  ...require("./preflight.vitesim-2.cjs"),
  ...require("./preflight.vitetypes-1.cjs"),
};
//# sourceMappingURL=preflight.vite-5.cjs.map