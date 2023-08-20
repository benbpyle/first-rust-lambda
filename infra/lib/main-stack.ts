import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { FunctionConstruct } from "./function-construct";

export class MainStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const corsFunc = new FunctionConstruct(this, "FunctionConstruct");
    }
}
