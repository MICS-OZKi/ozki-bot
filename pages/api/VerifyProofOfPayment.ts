// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { proofCookieExpirationTime } from "@/config/config";
import serverPath from "@/utils/helper";
import { verifier } from "ozki-lib";

type Data = {
  success: boolean;
};

const validateProof = async (status: boolean, proof: any, signal: any) => {
  // check the status if status true set the cookie
  console.log("Proof:");
  console.log(proof);
  console.log("Output:");
  console.log(signal);
  if (status) {
    const verificationKeyFilePath = serverPath(
      "public/verifier/verification_key.json"
    );
    try {
      const result = await verifier.verifyProof(
        proof,
        signal,
        verificationKeyFilePath
      );
      return result;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const getCookieMaxAge = () => {
  if (proofCookieExpirationTime) {
    return 60 * proofCookieExpirationTime;
  }
  return 60;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const validatedProof = await validateProof(
      req.body.status,
      req.body.proof,
      req.body.signal
    );
    if (validatedProof) {
      res.setHeader("Set-Cookie", [
        serialize("proof", JSON.stringify(req.body.proof), {
          maxAge: getCookieMaxAge(),
          secure: false,
          sameSite: "strict",
          path: "/",
        }),
      ]);
      res.statusCode = 200;
      res.json({
        success: true,
      });
    } else {
      res.statusCode = 400;
      res.json({
        success: false,
      });
    }
  }
}
