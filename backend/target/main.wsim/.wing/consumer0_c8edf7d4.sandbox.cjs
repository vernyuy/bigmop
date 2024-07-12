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
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/main.wsim/.wing/inflight.$Closure4-12.cjs")({
            $__parent_this_4_prodStorage: 
      (await (async () => {
        const ProductStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/main.wsim/.wing/inflight.ProductStorage-10.cjs")({
        $Product: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Product","type":"object","properties":{"categoryID":{"type":"string"},"description":{"type":"string"},"id":{"type":"string"},"imageUrl":{"type":"string"},"images":{"type":"array","items":{"type":"string"}},"name":{"type":"string"},"price":{"type":"number"},"qty":{"type":"number"},"subCategoryID":{"type":"string"},"unit":{"type":"string"},"weight":{"type":"number"}},"required":["categoryID","description","id","imageUrl","images","name","price","qty","subCategoryID","unit","weight"]}),
        $std_Number: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
      })
    ;
        const client = new ProductStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_b7ff29cb;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_b7ff29cb");
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
  let handle = process.env.TABLE_HANDLE_7903a5a6;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_7903a5a6");
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
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/main.wsim/.wing/inflight.OrderStorage-12.cjs")({
        $Order: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Order","type":"object","properties":{"cartID":{"type":"string"},"id":{"type":"string"},"orderProducts":{"type":"array","items":{"type":"object","patternProperties":{".*":{"type":"object","properties":{"productID":{"type":"string"},"qty":{"type":"number"},"totalPrice":{"type":"number"}},"required":["productID","qty","totalPrice"]}}}},"status":{"type":"string"},"userID":{"type":"string"}},"required":["cartID","id","orderProducts","status","userID"]}),
      })
    ;
        const client = new OrderStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_e35a3168;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_e35a3168");
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
  let handle = process.env.TABLE_HANDLE_61cd6052;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_61cd6052");
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
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});

process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
