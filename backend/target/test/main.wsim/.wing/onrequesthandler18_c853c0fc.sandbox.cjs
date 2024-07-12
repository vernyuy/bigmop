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
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure1-16.cjs")({
            $__parent_this_1_myBroadcaster: 
      (await (async () => {
        const BroadcasterClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.Broadcaster-8.cjs")({
      })
    ;
        const client = new BroadcasterClient({
          $this_clients: (function() {
  let handle = process.env.BUCKET_HANDLE_523a1d04;
  if (!handle) {
    throw new Error("Missing environment variable: BUCKET_HANDLE_523a1d04");
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
          $this_server: 
      (await (async () => {
        const WebSocketClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.WebSocket-7.cjs")({
      })
    ;
        const client = new WebSocketClient({
          $this_inner: 
      (await (async () => {
        const WebSocket_simClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.WebSocket_sim-6.cjs")({
        $http_Util: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
        $std_Json: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
      })
    ;
        const client = new WebSocket_simClient({
          $this_localStateKey: "local",
          $this_state: (function() {
  let handle = process.env.STATE_HANDLE_b63ab41d;
  if (!handle) {
    throw new Error("Missing environment variable: STATE_HANDLE_b63ab41d");
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
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    ,
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    ,
            $__parent_this_1_notificationStorage: 
      (await (async () => {
        const NotificationStorageClient = 
      require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.NotificationStorage-16.cjs")({
        $Notification: require("/usr/local/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"$id":"/Notification","type":"object","properties":{"description":{"type":"string"},"id":{"type":"string"},"name":{"type":"string"}},"required":["description","id","name"]}),
      })
    ;
        const client = new NotificationStorageClient({
          $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_b860debc;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_b860debc");
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
  let handle = process.env.TABLE_HANDLE_e6f18446;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_e6f18446");
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
