// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  gameProofFileName,
  leaderboardAPI,
  pinCode,
  secretAnswerSalt,
} from "@/config/config";
import { sendRequestExternalAPI } from "@/utils/request";
import { ProofOfHashGenerator, AnswerInfo} from "./ProofOfHashGenerator";
import serverPath from "@/utils/helper";

type Data = {
  success: boolean;
};

interface leadearboardInputData {
  proof: string;
  output: string[];
  nickname: string;
}

const generateHashQuizAnswerProof = async (
  pin: string,
  quizNumber: number
): Promise<[string, string[]]> => {
  // the current timestamp
  let timeStamp = Math.floor(new Date().getTime() / 1000);
  const FilePath = serverPath("public/generator/");

  let input: AnswerInfo  = {
    answerNo: quizNumber,
    answerString: secretAnswerSalt + pinCode
  };

  const generator = new ProofOfHashGenerator(FilePath, gameProofFileName);
  const [proof, publicSignals] = await generator.generateProof(
    timeStamp,
    input
  );

  const output = JSON.parse(JSON.stringify(publicSignals));
  return [proof, output];
};

const validateQuizAnswer = async (
  pin: string,
  nickname: string,
  quizNumber: number
) => {
  if (pin == pinCode) {
    const [proof, signal] = await generateHashQuizAnswerProof(pin, quizNumber);

    const data: leadearboardInputData = {
      proof: proof,
      output: signal,
      nickname: nickname,
    };

    await sendRequestExternalAPI(
      leaderboardAPI + "/VerifyQuizAnswer",
      JSON.stringify(data),
      "POST",
      { "Content-Type": "application/json" }
    ).catch((error) => {
      console.log(error);
      return false;
    });

    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const quizAnswer = await validateQuizAnswer(
      req.body.pin,
      req.body.nickname,
      req.body.quizNumber
    );
    if (quizAnswer) {
      res.statusCode = 200;
      res.send({
        success: true,
      });
    } else {
      res.statusCode = 400;
      res.send({
        success: false,
      });
    }
  }
}