import ProofGenerator from "ozki-lib/dist/proof-generator/src/ProofGenerator";
import ZkUtils from "ozki-lib/dist/common/src/ZkUtils";

export interface LoginInfo {
  domain:           string;
}

export class ProofOfLoginGenerator extends ProofGenerator<LoginInfo> {
    constructor(
        zkpComponentPath: string,
        zkpComponentName: string
        ) {
        console.log("#### ProofOfPaymentGenerator.ctor");
        super(zkpComponentPath, zkpComponentName);
    }

    protected formatCustomInput(loginInfo: LoginInfo): object {
        console.log("#### >>ProofOfPaymentGenerator.formatCustomInput");
        console.log("domain=%s", loginInfo.domain);

        const zkutils = new ZkUtils();
        const data =  zkutils.stringToBytes(loginInfo.domain) ;
        let input = {
            domain: data
        };

        console.log("#### <<ProofOfPaymentGenerator.formatCustomInput");
        return input;
    }    
}