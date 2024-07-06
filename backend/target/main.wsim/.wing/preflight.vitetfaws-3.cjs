"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const fs = $stdlib.fs;
const cdktf = require("cdktf");
const aws = require("@cdktf/provider-aws");
const vite_types = require("./preflight.vitetypes-1.cjs");
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static contentType(filename) {
    return ($extern("@winglibs/vite/util.cjs")["contentType"])(filename)
  }
  static listAllFiles($scope, directory, handler, cwd) {
    const files = (fs.Util.readdir(directory));
    const cwdLength = ((cwd ?? directory).length + 1);
    for (const file of files) {
      const path = String.raw({ raw: ["", "/", ""] }, directory, file);
      if ((fs.Util.isDir(path))) {
        (Util.listAllFiles($scope, path, handler, (cwd ?? directory)));
      }
      else {
        (handler((path.substring(cwdLength))));
      }
    }
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-2.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UtilClient = ${Util._toInflightType()};
        const client = new UtilClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
class Vite_tf_aws extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    const cliFilename = (Vite_tf_aws.cliFilename());
    const homeEnv = (util.Util.env("HOME"));
    const pathEnv = (util.Util.env("PATH"));
    const outDir = (Vite_tf_aws.build(({"root": props.root, "publicEnv": (props.publicEnv ?? ({})), "generateTypeDefinitions": (props.generateTypeDefinitions ?? true), "publicEnvName": (props.publicEnvName ?? "wing"), "typeDefinitionsFilename": (props.typeDefinitionsFilename ?? ".winglibs/wing-env.d.ts"), "cliFilename": cliFilename, "homeEnv": homeEnv, "pathEnv": pathEnv})));
    const distDir = String.raw({ raw: ["", "/", ""] }, props.root, outDir);
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const terraformBucket = $helpers.nodeof(bucket).defaultChild;
    (Util.listAllFiles(this, distDir, ((file) => {
      const key = String.raw({ raw: ["/", ""] }, file);
      const filename = (fs.Util.absolute(String.raw({ raw: ["", "/", ""] }, distDir, file)));
      let cacheControl = String.raw({ raw: ["public, max-age=", ""] }, (std.Duration.fromSeconds(60)).seconds);
      if (key.startsWith("/assets/")) {
        cacheControl = String.raw({ raw: ["public, max-age=", ", immutable"] }, (std.Duration.fromSeconds(31536000)).seconds);
      }
      if ($helpers.eq(file, "index.html")) {
        this.node.root.new("@cdktf/provider-aws.s3Object.S3Object", aws.s3Object.S3Object, this, String.raw({ raw: ["File", ""] }, key.replace("/", "--")), { dependsOn: [terraformBucket], key: key, bucket: terraformBucket.bucket, content: (fs.Util.readFile(filename)), contentType: (Util.contentType(filename)), cacheControl: cacheControl });
      }
      else {
        this.node.root.new("@cdktf/provider-aws.s3Object.S3Object", aws.s3Object.S3Object, this, String.raw({ raw: ["File", ""] }, key.replace("/", "--")), { dependsOn: [terraformBucket], key: key, bucket: terraformBucket.bucket, source: filename, sourceHash: (cdktf.Fn.md5(filename)), contentType: (Util.contentType(filename)), cacheControl: cacheControl });
      }
    })));
    this.node.root.new("@cdktf/provider-aws.s3BucketWebsiteConfiguration.S3BucketWebsiteConfiguration", aws.s3BucketWebsiteConfiguration.S3BucketWebsiteConfiguration, this, "S3BucketWebsiteConfiguration", { bucket: terraformBucket.bucket, indexDocument: ({"suffix": "index.html"}), errorDocument: ({"key": "index.html"}) });
    const originAccessControl = this.node.root.new("@cdktf/provider-aws.cloudfrontOriginAccessControl.CloudfrontOriginAccessControl", aws.cloudfrontOriginAccessControl.CloudfrontOriginAccessControl, this, "CloudfrontOriginAccessControl", { name: String.raw({ raw: ["", "-oac"] }, ($helpers.nodeof(this).path.substring(0, (64 - 4)))), originAccessControlOriginType: "s3", signingBehavior: "always", signingProtocol: "sigv4" });
    const distribution = this.node.root.new("@cdktf/provider-aws.cloudfrontDistribution.CloudfrontDistribution", aws.cloudfrontDistribution.CloudfrontDistribution, this, "CloudfrontDistribution", { enabled: true, defaultRootObject: "index.html", customErrorResponse: [({"errorCode": 403, "responseCode": 200, "responsePagePath": "/index.html"}), ({"errorCode": 404, "responseCode": 200, "responsePagePath": "/index.html"})], origin: [({"domainName": terraformBucket.bucketRegionalDomainName, "originId": "s3Origin", "originAccessControlId": originAccessControl.id})], defaultCacheBehavior: ({"allowedMethods": ["GET", "HEAD"], "cachedMethods": ["GET", "HEAD"], "targetOriginId": "s3Origin", "forwardedValues": ({"queryString": false, "cookies": ({"forward": "none"})}), "viewerProtocolPolicy": "redirect-to-https", "compress": true, "minTtl": (std.Duration.fromSeconds(60)).seconds, "defaultTtl": (std.Duration.fromSeconds(60)).seconds, "maxTtl": (std.Duration.fromSeconds(31536000)).seconds}), priceClass: "PriceClass_100", restrictions: ({"geoRestriction": ({"restrictionType": "none"})}), viewerCertificate: ({"cloudfrontDefaultCertificate": true}), orderedCacheBehavior: [({"pathPattern": "/assets/*", "allowedMethods": ["GET", "HEAD"], "cachedMethods": ["GET", "HEAD"], "targetOriginId": "s3Origin", "cachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6", "compress": true, "viewerProtocolPolicy": "redirect-to-https"})] });
    const allowDistributionReadOnly = this.node.root.new("@cdktf/provider-aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument", aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument, this, "DataAwsIamPolicyDocument", { statement: [({"actions": ["s3:GetObject"], "condition": [({"test": "StringEquals", "values": [distribution.arn], "variable": "AWS:SourceArn"})], "principals": [({"identifiers": ["cloudfront.amazonaws.com"], "type": "Service"})], "resources": [String.raw({ raw: ["", "/*"] }, terraformBucket.arn)]})] });
    this.node.root.new("@cdktf/provider-aws.s3BucketPolicy.S3BucketPolicy", aws.s3BucketPolicy.S3BucketPolicy, this, "S3BucketPolicy", ({"bucket": terraformBucket.id, "policy": allowDistributionReadOnly.json}));
    this.url = String.raw({ raw: ["https://", ""] }, distribution.domainName);
  }
  static cliFilename() {
    return ($extern("@winglibs/vite/vite.cjs")["cliFilename"])()
  }
  static build(options) {
    return ($extern("@winglibs/vite/vite.cjs")["build"])(options)
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Vite_tf_aws-2.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const Vite_tf_awsClient = ${Vite_tf_aws._toInflightType()};
        const client = new Vite_tf_awsClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { Vite_tf_aws };
//# sourceMappingURL=preflight.vitetfaws-3.cjs.map