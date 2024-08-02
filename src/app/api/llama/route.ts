import Replicate from "replicate";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import {OpenAIStream , StreamingTextResponse} from 'ai'
import { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});




export const POST = async(req: NextRequest , res:NextApiResponse)=>{
 
  
    try {


        const request = await req.json()
        const question = request?.question
        console.log(question)
       
        if(question.length===0){
            return NextResponse.json({result:"No question"},{status:200})
        }

        const input = {
            prompt: `for the following question just give the correct answer without any explanation question:${question}`
          };

          let completionResult:any
          
          for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
            completionResult += event?.toString()&&event.toString();
           
          };
               return NextResponse.json({ result: completionResult }, { status: 200 })

      } catch (error) {
        console.error('Error:', error); // Handle and log any errors
        return NextResponse.json({result:"failed"},{status:200})
      }
          
       
}