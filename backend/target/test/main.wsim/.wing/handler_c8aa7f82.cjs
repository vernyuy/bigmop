"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure1Client = 
          require("/Users/pro-3ie-s/Desktop/educloud/bigmop2/backend/target/test/main.wsim/.wing/inflight.$Closure1-7.cjs")({
            $__parent_this_1_url: process.env["WING_TOKEN_WSIM_ROOT_ENV0_BROADCASTER_COUNTER_UPDATES_COUNTER_UPDATES_STATE_ATTRS_URL"],
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};