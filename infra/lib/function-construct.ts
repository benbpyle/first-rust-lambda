import { Duration, Tags } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import * as path from "path";

export class FunctionConstruct extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const queue = new Queue(scope, "Queue", {
            queueName: "sample-queue",
        });
        const handler = new Function(scope, "Function", {
            code: Code.fromAsset(
                path.join(
                    __dirname,
                    "..",
                    "..",
                    "target/lambda/sample-function"
                )
            ),
            runtime: Runtime.PROVIDED_AL2,
            handler: "does_not_matter",
            environment: {
                RUST_LOG: "debug",
            },
            // The function execution time (in seconds) after which Lambda terminates the function.
            functionName: "sample-function",
            timeout: Duration.seconds(10),
        });

        queue.grantConsumeMessages(handler);
        handler.addEventSource(
            new SqsEventSource(queue, {
                batchSize: 1,
                enabled: true,
            })
        );
    }
}
