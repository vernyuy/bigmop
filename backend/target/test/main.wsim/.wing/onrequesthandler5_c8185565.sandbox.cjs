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
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure3-11.cjs")({
            $__parent_this_3_userStorage: 
      (await (async () => {
        const UserStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.UserStorage-11.cjs")({
        $User: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/User","type":"object","properties":{"dob":{"type":"string"},"email":{"type":"string"},"firstName":{"type":"string"},"id":{"type":"string"},"imageUrl":{"type":"string"},"lastName":{"type":"string"},"username":{"type":"string"}},"required":["dob","email","firstName","id","imageUrl","lastName","username"]}),
        $std_Number: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
      })
    ;
        const client = new UserStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_b56d867f;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_b56d867f");
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
  let handle = process.env.TABLE_HANDLE_a0e76365;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_a0e76365");
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
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});

process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
