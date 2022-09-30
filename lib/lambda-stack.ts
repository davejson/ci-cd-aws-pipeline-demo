import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const calcLayer = new lambda.LayerVersion(this, 'calc-layer', {
        compatibleRuntimes: [
          lambda.Runtime.NODEJS_12_X,
          lambda.Runtime.NODEJS_14_X,
        ],
        code: lambda.Code.fromAsset('lib/lambda/layers/calc/nodejs/node_modules'),
        description: 'multiplies a number by 2',
      });

      new lambda.Function(this, 'LambdaFunction', {
        runtime: lambda.Runtime.NODEJS_12_X, //using node for this, but can easily use python or other
        handler: 'handler.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
        environment: { "stageName": stageName }, //inputting stagename
        layers: [calcLayer],
      });
    }
    
    
}