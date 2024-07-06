"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const aws = $stdlib.aws;
const commons = require("./preflight.api-6.cjs");
const awsapi = require("./preflight.api-8.cjs");
const awscdk = require("aws-cdk-lib");
class WebSocket_awscdk extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    this.api = this.node.root.new("aws-cdk-lib.aws_apigatewayv2.CfnApi", awscdk.aws_apigatewayv2.CfnApi, this, "Default", { name: props.name, protocolType: "WEBSOCKET", routeSelectionExpression: "$request.body.action" });
    this.role = this.node.root.new("aws-cdk-lib.aws_iam.Role", awscdk.aws_iam.Role, this, "Role", { assumedBy: new awscdk.aws_iam.ServicePrincipal("apigateway.amazonaws.com") });
    const stageName = (props.stageName ?? "prod");
    this.deployment = this.node.root.new("aws-cdk-lib.aws_apigatewayv2.CfnDeployment", awscdk.aws_apigatewayv2.CfnDeployment, this, "CfnDeployment", { apiId: this.api.attrApiId });
    const stage = this.node.root.new("aws-cdk-lib.aws_apigatewayv2.CfnStage", awscdk.aws_apigatewayv2.CfnStage, this, "CfnStage", { apiId: this.api.attrApiId, stageName: stageName, deploymentId: this.deployment.attrDeploymentId, autoDeploy: true });
    this.region = (awscdk.Stack.of(this)).region;
    const urlSuffix = (awscdk.Stack.of(this)).urlSuffix;
    this.url = this.api.attrApiEndpoint;
    this.node.root.new("aws-cdk-lib.CfnOutput", awscdk.CfnOutput, this, "url", { value: this.url, exportName: "url" });
    this.node.root.new("aws-cdk-lib.CfnOutput", awscdk.CfnOutput, this, "callbackUrl", { value: String.raw({ raw: ["https://", ".execute-api.", ".", "/", ""] }, this.api.attrApiId, $helpers.unwrap(this.region), urlSuffix, stageName), exportName: "callbackUrl" });
  }
  onLift(host, ops) {
    {
      const $if_let_value = (aws.Function.from(host));
      if ($if_let_value != undefined) {
        const host = $if_let_value;
        if (ops.includes("sendMessage")) {
          (host.addPolicyStatements(({"effect": awscdk.aws_iam.Effect.ALLOW, "actions": ["execute-api:ManageConnections", "execute-api:Invoke"], "resources": ["*"]})));
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-4.cjs")({
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
    const onConnectFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on connect", new $Closure1(this, "$Closure1"));
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-4.cjs")({
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
    const onDisconnectFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on disconnect", new $Closure2(this, "$Closure2"));
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-4.cjs")({
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
    const onMessageFunction = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "on message", new $Closure3(this, "$Closure3"));
    (this.addRoute(onMessageFunction, routeKey));
  }
  addRoute(handler, routeKey) {
    {
      const $if_let_value = (aws.Function.from(handler));
      if ($if_let_value != undefined) {
        const lambda = $if_let_value;
        const functionArn = lambda.functionArn;
        (this.role.addToPolicy(new awscdk.aws_iam.PolicyStatement({ effect: awscdk.aws_iam.Effect.ALLOW, resources: [functionArn], actions: ["lambda:InvokeFunction"] })));
        const integrationUri = ((awscdk.Stack.of(this)).formatArn(({"service": "apigateway", "account": "lambda", "resource": "path/2015-03-31/functions", "resourceName": String.raw({ raw: ["", "/invocations"] }, functionArn)})));
        const integration = this.node.root.new("aws-cdk-lib.aws_apigatewayv2.CfnIntegration", awscdk.aws_apigatewayv2.CfnIntegration, this, String.raw({ raw: ["", "Integration"] }, routeKey), { apiId: this.api.attrApiId, integrationType: "AWS_PROXY", integrationUri: integrationUri, credentialsArn: this.role.roleArn });
        const route = this.node.root.new("aws-cdk-lib.aws_apigatewayv2.CfnRoute", awscdk.aws_apigatewayv2.CfnRoute, this, String.raw({ raw: ["", "Route"] }, routeKey), { apiId: this.api.attrApiId, routeKey: routeKey, authorizationType: "NONE", target: String.raw({ raw: ["integrations/", ""] }, integration.ref) });
        (this.deployment.addDependency(route));
      }
    }
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.WebSocket_awscdk-4.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WebSocket_awscdkClient = ${WebSocket_awscdk._toInflightType()};
        const client = new WebSocket_awscdkClient({
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
        [WebSocket_awscdk, ["_postToConnection"]],
        [this.url, ["replace"]],
      ],
      "$inflight_init": [
        [WebSocket_awscdk, []],
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
module.exports = { WebSocket_awscdk };
//# sourceMappingURL=preflight.awscdk-9.cjs.map