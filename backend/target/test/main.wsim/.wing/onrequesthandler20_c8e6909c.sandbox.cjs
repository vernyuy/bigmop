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
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure1-17.cjs")({
            $counter: (function() {
  let handle = process.env.COUNTER_HANDLE_f9685446;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_f9685446");
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
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});

process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
