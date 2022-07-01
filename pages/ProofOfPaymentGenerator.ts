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

export interface InputPayPalObject {
    payment_subs_id:    number[]; // payment plan id
    pa:                 number[];
}

export class ProofOfPaymentGenerator extends ProofGenerator {
    private subsData: SubscriptionData;

    constructor(subsData: SubscriptionData) {
        console.log("#### ProofOfPaymentGenerator ctor");
        super();
        this.subsData = subsData;
    }

    protected getCustomInput(): any {
        console.log("#### getCustomInput");
        const zkutils = new ZkUtils();
        let input: InputPayPalObject = {
            payment_subs_id: zkutils.stringToBytes(this.subsData.subsPlanID), // payment plan id
            pa: zkutils.numberToBytes(this.subsData.subsAge, 4),
        };

        return input;
    }    
}