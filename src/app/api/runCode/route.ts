import OpenAI from "openai";

// export const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })

import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch your API_KEY

  ;

// Access your API key (see "Set up your API key" above)
// console.log(process.env.GEMINI_API_KEY)




import { NextRequest, NextResponse } from "next/server";
import {OpenAIStream , StreamingTextResponse} from 'ai'
import { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

export const POST = async(req: NextRequest , res:NextApiResponse)=>{
 
  
    try {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        const request = await req.json()
        const question = request?.question
        const code = request?.code
        const input = request?.input
        console.log(question)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if(question.length===0){
            return NextResponse.json({result:"No question"},{status:200})
        }
    
        const prompt = `Consider the following question:
        question:${question},
        code:${code},
        testcase input:${input},
        now give the expected output, just the output explanation is not required.
        `;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Await the text extraction
        // const con = JSON.parse(text); // Parse the JSON string
        console.log(typeof text); // Log the result

        return NextResponse.json({ result: text }, { status: 200 })

      } catch (error) {
        console.error('Error:', error); // Handle and log any errors
        return NextResponse.json({result:"failed"},{status:200})
      }
          
        // console.log(response)
        
       
        // const stream = OpenAIStream(response,{
        //   onCompletion:(completion)=>{
        //     console.log(completion)
        //   }
        // });
       
        
        // return new StreamingTextResponse(stream)
        // return 1

    //     const completionResult = response.choices[0].message.content;
    //     // console.log(completionResult);

    //     // Extract the JSON array from the completion result
    //     const jsonResponse = JSON.parse(completionResult!);
    //     // console.log(jsonResponse);

    // }catch(err){
    //     throw new Error("Something went wrong!")
    // }
}