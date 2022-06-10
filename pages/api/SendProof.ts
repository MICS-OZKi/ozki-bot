// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { proofCookieExpirationTime } from "@/config/config";

type Data = {
  success: boolean;
};

const validateProof = (status: boolean, proof: any) => {
  // check the status if status true set the cookie
  if (status) {
    return true;
  } else {
    return false;
  }
};

const getCookieMaxAge = () => {
  if (proofCookieExpirationTime) {
    return 60 * proofCookieExpirationTime;
  }
  return 60;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const validatedProof = validateProof(req.body.status, req.body.proof);
    if (validatedProof) {
      res.setHeader("Set-Cookie", [
        serialize("proof", req.body.proof, {
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
    }
  }
}
