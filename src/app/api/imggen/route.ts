import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const request = await req.json();
    const prompt = request?.prompt;
    const size = request?.size || "1024x1024";
    const n = request?.n || 1;

    console.log(1)

    if (!prompt || prompt.length === 0) {
      return NextResponse.json({ result: "No prompt provided" }, { status: 400 });
    }
    console.log(2)

    const response = await openai.images.generate({
      model: "dall-e-3", // Specify the DALL-E model version
      prompt: prompt,
      n: n,
      size: size,
    });
    console.log(3)

    const imageUrl = response.data[0].url;
    console.log("Generated image URL:", imageUrl);

    return NextResponse.json({ result: imageUrl }, { status: 200 });

  } catch (error) {
    console.error("Error:", error); // Handle and log any errors
    return NextResponse.json({ result: "failed" }, { status: 500 });
  }
};
