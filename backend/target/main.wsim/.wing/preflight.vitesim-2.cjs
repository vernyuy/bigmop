"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const sim = $stdlib.sim;
const util = $stdlib.util;
const fs = $stdlib.fs;
const vite_types = require("./preflight.vitetypes-1.cjs");
class Vite_sim extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    const state = this.node.root.new("@winglang/sdk.sim.State", sim.State, this, "State");
    this.url = (state.token("url"));
    const cliFilename = (Vite_sim.cliFilename());
    const homeEnv = ((util.Util.tryEnv("HOME")) ?? "");
    const pathEnv = ((util.Util.tryEnv("PATH")) ?? "");
    const openBrowser = ((() => {
      if ($helpers.eq((util.Util.env("WING_IS_TEST")), "true")) {
        return false;
      }
      return (props.openBrowser ?? false);
    })());
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $Vite_sim: ${$stdlib.core.liftObject(Vite_sim)},
            $cliFilename: ${$stdlib.core.liftObject(cliFilename)},
            $homeEnv: ${$stdlib.core.liftObject(homeEnv)},
            $openBrowser: ${$stdlib.core.liftObject(openBrowser)},
            $pathEnv: ${$stdlib.core.liftObject(pathEnv)},
            $props_generateTypeDefinitions: ${$stdlib.core.liftObject(props.generateTypeDefinitions)},
            $props_publicEnv: ${$stdlib.core.liftObject(props.publicEnv)},
            $props_publicEnvName: ${$stdlib.core.liftObject(props.publicEnvName)},
            $props_root: ${$stdlib.core.liftObject(props.root)},
            $props_typeDefinitionsFilename: ${$stdlib.core.liftObject(props.typeDefinitionsFilename)},
            $state: ${$stdlib.core.liftObject(state)},
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
            [Vite_sim, ["dev"]],
            [cliFilename, []],
            [homeEnv, []],
            [openBrowser, []],
            [pathEnv, []],
            [props.generateTypeDefinitions, []],
            [props.publicEnv, []],
            [props.publicEnvName, []],
            [props.root, []],
            [props.typeDefinitionsFilename, []],
            [state, ["set"]],
          ],
          "$inflight_init": [
            [Vite_sim, []],
            [cliFilename, []],
            [homeEnv, []],
            [openBrowser, []],
            [pathEnv, []],
            [props.generateTypeDefinitions, []],
            [props.publicEnv, []],
            [props.publicEnvName, []],
            [props.root, []],
            [props.typeDefinitionsFilename, []],
            [state, []],
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "Service", new $Closure1(this, "$Closure1"));
  }
  static cliFilename() {
    return ($extern("@winglibs/vite/vite.cjs")["cliFilename"])()
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Vite_sim-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const Vite_simClient = ${Vite_sim._toInflightType()};
        const client = new Vite_simClient({
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
  static get _liftTypeMap() {
    return ({
      "dev": [
      ],
    });
  }
}
module.exports = { Vite_sim };
//# sourceMappingURL=preflight.vitesim-2.cjs.map