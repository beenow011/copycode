import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import {OpenAIStream , StreamingTextResponse} from 'ai'
import { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
})


export const POST = async(req: NextRequest , res:NextApiResponse)=>{
 
  
    try {
        // language,
        // question,
        // inputFormat,
        // outputFormat,
        // example,
        // codeSnippet

        const request = await req.json()
        const question = request?.question
        const language = request?.language
        const inputFormat = request?.inputFormat
        const outputFormat = request?.outputFormat
        const example = request?.example
        const codeSnippet = request?.codeSnippet
        const constraints = request?.constraints
        const error = request?.error
        // console.log(question)
       
        if(error.length===0){
            return NextResponse.json({result:"No question"},{status:200})
        }
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Correct model name use gpt-4-turbo-2024-04-09 in production
            temperature: 0.1, // Adjust the temperature as needed
            stream: false,
            messages: [
                {
                    role: 'assistant',
                    content: `for the following code provided by openAI there is some error, review the code and give back the corrected code without any explaination
                    question:${question},
                    programming language:${language},
                    input format:${inputFormat},
                    output format: ${outputFormat},
                    example:${example},
                    constraints: ${constraints}
                    the code:${codeSnippet}
                    error:${error}
                    `
                }
            ]
        });
        const completionResult = response.choices[0].message.content;
        
        // const jsonResponse = JSON.parse(completionResult!);
    
       

        return NextResponse.json({ result: completionResult }, { status: 200 })

      } catch (error) {
        console.error('Error:', error); // Handle and log any errors
        return NextResponse.json({result:"failed"},{status:200})
      }
          
       
}