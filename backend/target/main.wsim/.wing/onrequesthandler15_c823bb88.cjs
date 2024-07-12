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
            const $Closure1Client = 
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/main.wsim/.wing/inflight.$Closure1-15.cjs")({
            $__parent_this_1_cartStorage: 
      (await (async () => {
        const CartStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/main.wsim/.wing/inflight.CartStorage-15.cjs")({
        $Cart: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Cart","type":"object","properties":{"createdAt":{"type":"string"},"id":{"type":"string"},"productId":{"type":"string"},"qty":{"type":"number"},"status":{"type":"string"},"userId":{"type":"string"}},"required":["createdAt","id","productId","qty","status","userId"]}),
      })
    ;
        const client = new CartStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_9ee22af7;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_9ee22af7");
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
  let handle = process.env.TABLE_HANDLE_ce028198;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_ce028198");
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
            $std_Json: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
            $std_Number: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
          })
        ;
            const client = new $Closure1Client({
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