"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const aws = $stdlib.aws;
const cloud = $stdlib.cloud;
const commons = require("./preflight.api-6.cjs");
const cdktf = require("cdktf");
const tfaws = require("@cdktf/provider-aws");
const awsapi = require("./preflight.api-8.cjs");
class WebSocket_tfaws extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    this.webSocketApi = this.node.root.new("@cdktf/provider-aws.apigatewayv2Api.Apigatewayv2Api", tfaws.apigatewayv2Api.Apigatewayv2Api, this, "Apigatewayv2Api", { name: props.name, protocolType: "WEBSOCKET", routeSelectionExpression: "$request.body.action" });
    this.role = this.node.root.new("@cdktf/provider-aws.iamRole.IamRole", tfaws.iamRole.IamRole, this, "IamRole", { assumeRolePolicy: ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"Version": "2012-10-17", "Statement": ({"Action": "sts:AssumeRole", "Effect": "Allow", "Sid": "", "Principal": ({"Service": "apigateway.amazonaws.com"})})})) });
    const stageName = (props.stageName ?? "prod");
    const stage = this.node.root.new("@cdktf/provider-aws.apigatewayv2Stage.Apigatewayv2Stage", tfaws.apigatewayv2Stage.Apigatewayv2Stage, this, "Apigatewayv2Stage", { apiId: (cdktf.Token.asString(this.webSocketApi.id)), name: stageName, autoDeploy: true });
    this.url = stage.invokeUrl;
  }
  onLift(host, ops) {
    {
      const $if_let_value = (aws.Function.from(host));
      if ($if_let_value != undefined) {
        const host = $if_let_value;
        if (ops.includes("sendMessage")) {
          (host.addPolicyStatements(({"actions": ["execute-api:ManageConnections", "execute-api:Invoke"], "resources": ["*"]})));
        }
      }
    }
  }
  onConnect(handler) {
    const routeKey = "$connect";
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-5.cjs")({
            $handler: ${$stdlib.core.liftObject(handler)},
            $routeKey: ${$stdlib.core.liftObject(routeKey)},
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
            [handler, ["handle"]],
            [routeKey, []],
          ],
          "$inflight_init": [
            [handler, []],
            [routeKey, []],
          ],
        });
      }
    }
    const onConnectFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on connect", new $Closure1(this, "$Closure1"), { env: ({"url": this.url}) });
    (this.addRoute(onConnectFunction, routeKey));
  }
  onDisconnect(handler) {
    const routeKey = "$disconnect";
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-5.cjs")({
            $handler: ${$stdlib.core.liftObject(handler)},
            $routeKey: ${$stdlib.core.liftObject(routeKey)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [handler, ["handle"]],
            [routeKey, []],
          ],
          "$inflight_init": [
            [handler, []],
            [routeKey, []],
          ],
        });
      }
    }
    const onDisconnectFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on disconnect", new $Closure2(this, "$Closure2"), { env: ({"url": this.url}) });
    (this.addRoute(onDisconnectFunction, routeKey));
  }
  onMessage(handler) {
    const routeKey = "$default";
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-5.cjs")({
            $handler: ${$stdlib.core.liftObject(handler)},
            $routeKey: ${$stdlib.core.liftObject(routeKey)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [handler, ["handle"]],
            [routeKey, []],
          ],
          "$inflight_init": [
            [handler, []],
            [routeKey, []],
          ],
        });
      }
    }
    const onMessageFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on message", new $Closure3(this, "$Closure3"), { env: ({"url": this.url}) });
    (this.addRoute(onMessageFunction, routeKey));
  }
  addRoute(handler, routeKey) {
    {
      const $if_let_value = (aws.Function.from(handler));
      if ($if_let_value != undefined) {
        const func = $if_let_value;
        const functionArn = func.functionArn;
        const iamPolicy = this.node.root.new("@cdktf/provider-aws.iamPolicy.IamPolicy", tfaws.iamPolicy.IamPolicy, this, String.raw({ raw: ["", "Policy"] }, routeKey), { policy: (cdktf.Fn.jsonencode(({"Version": "2012-10-17", "Statement": [({"Action": ["lambda:InvokeFunction"], "Effect": "Allow", "Resource": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(functionArn)})]}))) });
        this.node.root.new("@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment", tfaws.iamRolePolicyAttachment.IamRolePolicyAttachment, this, String.raw({ raw: ["", "PolicyAttachment"] }, routeKey), { role: this.role.name, policyArn: iamPolicy.arn });
        const integration = this.node.root.new("@cdktf/provider-aws.apigatewayv2Integration.Apigatewayv2Integration", tfaws.apigatewayv2Integration.Apigatewayv2Integration, this, String.raw({ raw: ["", "Integration"] }, routeKey), { apiId: (cdktf.Token.asString(this.webSocketApi.id)), integrationType: "AWS_PROXY", integrationUri: functionArn, credentialsArn: this.role.arn });
        const route = this.node.root.new("@cdktf/provider-aws.apigatewayv2Route.Apigatewayv2Route", tfaws.apigatewayv2Route.Apigatewayv2Route, this, String.raw({ raw: ["", "Route"] }, routeKey), { apiId: this.webSocketApi.id, routeKey: routeKey, authorizationType: "NONE", target: String.raw({ raw: ["integrations/", ""] }, integration.id) });
      }
    }
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.WebSocket_tfaws-5.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WebSocket_tfawsClient = ${WebSocket_tfaws._toInflightType()};
        const client = new WebSocket_tfawsClient({
          $this_url: ${$stdlib.core.liftObject(this.url)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "sendMessage": [
        [WebSocket_tfaws, ["_postToConnection"]],
        [this.url, []],
      ],
      "$inflight_init": [
        [WebSocket_tfaws, []],
        [this.url, []],
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "_postToConnection": [
      ],
    });
  }
}
module.exports = { WebSocket_tfaws };
//# sourceMappingURL=preflight.tfaws-10.cjs.map