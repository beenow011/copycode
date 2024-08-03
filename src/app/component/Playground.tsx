'use client';
import { PlaygroundContext } from '@/context/playground'
import React, { useContext, useState } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Button } from '@/components/ui/button';
import { LoaderPinwheel } from 'lucide-react';
import { error } from 'console';
import { useToast } from '@/components/ui/use-toast';

function onChange2(newValue: string) {
    console.log("change", newValue);
}

function Playground() {
    const { data, setData } = useContext(PlaygroundContext);
    const [res, setRes] = useState('')
    const [res2, setRes2] = useState('')
    const [load1, setLoad1] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [code, setCode] = useState(data.code.substring(3, data.code.length - 3))
    // const data = {
    //     language: 'python',
    //     question: 'loewm3',
    //     inputFormat: '',
    //     outputFormat: '',
    //     example: '',
    //     codeSnippet: '',
    //     code: 'print "hello"'
    // }
    const run = () => {
        setLoad1(true)
        fetch('/api/runCode', {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ question: data.question, code, input }), // Send the question as JSON in the body
        })
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setRes(data.result); // Set the response data to state
                console.log(data.result); // Log the result
                setLoad1(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoad1(false)
            });
    }
    const recheck = () => {
        setLoad2(true)
        fetch('/api/recheck', {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({
                language: data.language,
                question: data.question,
                inputFormat: data.inputFormat,
                outputFormat: data.outputFormat,
                example: data.example,
                codeSnippet: code,
                constraints: data.constraints,
                error
            }), // Send the question as JSON in the body
        })
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setRes2(data.result); // Set the response data to state
                console.log(data.result); // Log the result
                setLoad2(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoad2(false)
            });
    }
    if (data.question.length === 0) {
        return (
            <div className='flex items-center justify-center h-screen bg-gray-900'>
                <h1 className='text-white text-2xl'>Go back to start over.</h1>
            </div>
        );
    }
    //     function onChange(newValue: string) {
    //         // console.log("change", newValue);
    //         setData(prev => { ...prev, code: newValue })
    // }
    function onChange(newValue: string) {
        // console.log("change", newValue);
        // setData(prev => ({ ...prev, code: newValue }));
        setCode(newValue)
    }
    const { toast } = useToast()
    const copyCode = () => {
        navigator.clipboard.writeText(code.substring(3, code.length - 3))
        toast({
            title: "Code copied to your keyboard.",
            description: "You can directly paste the code.",

        })
    }

    return (
        <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center p-4'>
            <div className='w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h1 className='text-4xl font-bold mb-6 text-center text-purple-400'>{data.language}</h1>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Question:</h2>
                    <p className='mt-2 p-4 bg-gray-700 rounded'>{data.question}</p>
                </div>
                {
                    data.inputFormat.length > 0 && (

                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-purple-300'>Input Format:</h2>
                            <p className='mt-2 p-4 bg-gray-700 rounded'>{data.inputFormat}</p>
                        </div>
                    )
                }
                {
                    data.outputFormat.length > 0 && (
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-purple-300'>Output Format:</h2>
                            <p className='mt-2 p-4 bg-gray-700 rounded'>{data.outputFormat}</p>
                        </div>
                    )
                }

                {
                    data.example.length > 0 && (
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-purple-300'>Example:</h2>
                            <p className='mt-2 p-4 bg-gray-700 rounded'>{data.example}</p>
                        </div>
                    )
                }

                {
                    data.codeSnippet.length > 0 && (
                        <div className='mb-6'>
                            <h2 className='text-2xl font-semibold text-purple-300'>Code Snippet:</h2>
                            <pre className='mt-2 p-4 bg-gray-700 rounded whitespace-pre-wrap'>{data.codeSnippet}</pre>
                        </div>
                    )
                }

                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Code:</h2>
                    <div className='flex flex-col lg:flex-row gap-4 justify-center mt-2'>
                        <div className='w-full lg:w-1/2'>
                            <AceEditor
                                placeholder="Placeholder Text"
                                mode={data.language}
                                theme="twilight"
                                name="code-editor"
                                onChange={onChange}
                                fontSize={14}
                                lineHeight={19}
                                showPrintMargin={true}
                                width='100%'
                                showGutter={true}
                                highlightActiveLine={true}
                                value={code}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}
                                className="rounded"
                            />
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <div className='h-full w-full p-4 bg-gray-700 rounded'>
                                <h3 className='text-xl font-semibold text-purple-300 mb-2'>Sample Input:</h3>
                                <textarea
                                    rows={6}
                                    className='w-full bg-black text-white font-mono p-2 rounded'
                                    placeholder="Enter sample input here"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                ></textarea>
                                <button className='mt-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600' onClick={run}>Run</button>
                                <div>
                                    {load1 ? <div className='w-full flex mt-7 justify-center items-center'>
                                        <LoaderPinwheel className='h-8 w-8 text-purple-600 animate-spin' />
                                    </div> : (
                                        res && (
                                            <div className='w-full bg-black text-white font-mono mt-2 p-2 rounded'>
                                                {res}
                                            </div>
                                        )
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Error in the code or debugging required</h2>
                    <textarea className='mt-2 p-2 w-full text-black bg-gray-300 rounded whitespace-pre-wrap' rows={5} value={error} onChange={(e) => setError(e.target.value)}></textarea>
                </div>
                <Button onClick={recheck}>Recheck</Button>
                <p className='text-green-600 text-sm mt-2'>
                    if you are facing any error in the provided code, write about the error in the above section and <strong>recheck</strong>
                </p>
                {
                    load2 ? (
                        <div className='w-full flex mt-7 justify-center items-center'>
                            <LoaderPinwheel className='h-8 w-8 text-purple-600 animate-spin' />
                        </div>
                    ) : res2 && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-xl font-semibold text-purple-600 mb-4">Code Result <span className='text-xs '>GPT4o-mini</span></h3>
                            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                                <code>{res2.substring(3, code.length - 3)}</code>
                            </pre>
                            <div className='flex justify-between'>
                                <button
                                    onClick={copyCode}
                                    className="mt-3 bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    Copy Code
                                </button>

                            </div>
                            <p className="mt-3 text-gray-600 text-sm">
                                <strong>Disclaimer:</strong> The code provided is generated by AI and may contain errors. Please review and test thoroughly.

                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    );


}

export default Playground;
