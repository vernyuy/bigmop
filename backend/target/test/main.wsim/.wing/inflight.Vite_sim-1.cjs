"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Vite_sim {
    constructor({  }) {
    }
    static async dev(options) {
      return (require("@winglibs/vite/vite.cjs")["dev"])(options)
    }
  }
  return Vite_sim;
}
//# sourceMappingURL=inflight.Vite_sim-1.cjs.map