import ProofGenerator from "ozki-lib/dist/proof-generator/src/ProofGenerator";
import ZkUtils from "ozki-lib/dist/common/src/ZkUtils";

export interface SubscriptionData {
  subsPlanID:           string;
  timestamp:            number;
  subsAge:              number;
  signature:            Array<any>;
  error?:               string;
  error_description?:   string;
}

interface InputPayPalObject {
    payment_subs_id:    number[]; // payment plan id
    pa:                 number[];
}

export class ProofOfPaymentGenerator extends ProofGenerator<SubscriptionData> {
    constructor(
        zkpComponentPath: string,
        zkpComponentName: string
        ) {
        console.log("#### ProofOfPaymentGenerator.ctor");
        super(zkpComponentPath, zkpComponentName);
    }

    protected formatCustomInput(subsData: SubscriptionData): any {
        console.log("#### ProofOfPaymentGenerator.formatCustomInput");
        const zkutils = new ZkUtils();
        let input: InputPayPalObject = {
            payment_subs_id: zkutils.stringToBytes(subsData.subsPlanID), // payment plan id
            pa: zkutils.numberToBytes(subsData.subsAge, 4),
        };

        return input;
    }    
}