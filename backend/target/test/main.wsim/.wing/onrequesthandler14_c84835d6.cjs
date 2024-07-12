"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? ((await (async () => {
  const $func = async (ctx, event) => {
            if (!event) {
                throw new Error("invalid API request event");
            }
            let req = JSON.parse(event);
            const response = await ctx.handler(req);
            if (!response) {
                return undefined;
            }
            else {
                return JSON.stringify(response);
            }
        }
  const $ctx = {
  handler: 
          (await (async () => {
            const $Closure3Client = 
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure3-14.cjs")({
            $__parent_this_3_subSubCategoryStorage: 
      (await (async () => {
        const SubCategoryStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.SubCategoryStorage-14.cjs")({
        $SubCategory: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/SubCategory","type":"object","properties":{"description":{"type":"string"},"id":{"type":"string"},"name":{"type":"string"},"parentCategoryID":{"type":"string"}},"required":["description","id","name","parentCategoryID"]}),
      })
    ;
        const client = new SubCategoryStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_2dbc04da;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_2dbc04da");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  const backend = require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
  const client = new Proxy(backend, {
    get: function(target, prop, receiver) {
      return async function(...args) {
        return backend.call(prop, args);
      };
    },
  });
  return client;
})(),
          $this_db: (function() {
  let handle = process.env.TABLE_HANDLE_5b766ff9;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_5b766ff9");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
})(),
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    ,
            $auth: 
      (await (async () => {
        const BasicAuthClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.BasicAuth-9.cjs")({
        $std_Json: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
        $util_Util: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/util/util.js").Util,
      })
    ;
        const client = new BasicAuthClient({
          $this_password: "admin",
          $this_user: "admin",
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    ,
            $std_Json: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
          })
        ;
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)()));
  return await $handler.handle(event);
};