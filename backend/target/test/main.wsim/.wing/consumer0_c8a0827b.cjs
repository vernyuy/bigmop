"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? ((await (async () => {
  const $func = async (ctx, event) => {
            const batchItemFailures = [];
            let parsed = JSON.parse(event ?? "{}");
            if (!parsed.messages)
                throw new Error('No "messages" field in event.');
            for (const $message of parsed.messages) {
                try {
                    await ctx.handler($message.payload);
                }
                catch (error) {
                    // TODO: an error from user code is getting dropped - bad! https://github.com/winglang/wing/issues/6445
                    batchItemFailures.push($message);
                }
            }
            return batchItemFailures.length > 0
                ? JSON.stringify(batchItemFailures)
                : undefined;
        }
  const $ctx = {
  handler: 
          (await (async () => {
            const $Closure4Client = 
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure4-12.cjs")({
            $__parent_this_4_prodStorage: 
      (await (async () => {
        const ProductStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.ProductStorage-10.cjs")({
        $Product: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Product","type":"object","properties":{"id":{"type":"string"},"imageUrl":{"type":"string"},"name":{"type":"string"},"price":{"type":"number"},"qty":{"type":"number"}},"required":["id","imageUrl","name","price","qty"]}),
        $std_Number: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
      })
    ;
        const client = new ProductStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_06856345;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_06856345");
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
  let handle = process.env.TABLE_HANDLE_edc9f379;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_edc9f379");
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
            $__parent_this_4_storage: 
      (await (async () => {
        const OrderStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.OrderStorage-12.cjs")({
        $Order: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Order","type":"object","properties":{"id":{"type":"string"},"productId":{"type":"string"},"qty":{"type":"number"},"status":{"type":"string"}},"required":["id","productId","qty","status"]}),
      })
    ;
        const client = new OrderStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_084ab8ac;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_084ab8ac");
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
  let handle = process.env.TABLE_HANDLE_555da8df;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_555da8df");
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
            const client = new $Closure4Client({
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