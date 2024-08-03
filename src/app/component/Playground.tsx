'use client';
import { PlaygroundContext } from '@/context/playground'
import React, { useContext } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Button } from '@/components/ui/button';
function onChange(newValue: string) {
    console.log("change", newValue);
}
function onChange2(newValue: string) {
    console.log("change", newValue);
}

function Playground() {
    const { data } = useContext(PlaygroundContext);
    // const data = {
    //     language: 'python',
    //     question: 'loewm3',
    //     inputFormat: '',
    //     outputFormat: '',
    //     example: '',
    //     codeSnippet: '',
    //     code: 'print "hello"'
    // }

    if (data.question.length === 0) {
        return (
            <div className='flex items-center justify-center h-screen bg-gray-900'>
                <h1 className='text-white text-2xl'>Go back to start over.</h1>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center p-4'>
            <div className='w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h1 className='text-4xl font-bold mb-6 text-center text-purple-400'>{data.language}</h1>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Question:</h2>
                    <p className='mt-2 p-4 bg-gray-700 rounded'>{data.question}</p>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Input Format:</h2>
                    <p className='mt-2 p-4 bg-gray-700 rounded'>{data.inputFormat}</p>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Output Format:</h2>
                    <p className='mt-2 p-4 bg-gray-700 rounded'>{data.outputFormat}</p>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Example:</h2>
                    <p className='mt-2 p-4 bg-gray-700 rounded'>{data.example}</p>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Code Snippet:</h2>
                    <pre className='mt-2 p-4 bg-gray-700 rounded whitespace-pre-wrap'>{data.codeSnippet}</pre>
                </div>
                <div className='mb-6'>
                    <h2 className='text-2xl font-semibold text-purple-300'>Code:</h2>
                    <div className='flex justify-center  mt-2'>
                        <div className=''>
                            <AceEditor
                                placeholder="Placeholder Text"
                                mode={data.language}
                                theme="twilight"
                                name="code-editor"
                                onChange={onChange}
                                fontSize={14}
                                lineHeight={19}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={data.code}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}
                            />
                        </div>
                        <div className='flex-2'>
                            <div className='h-full w-full p-4 bg-gray-700 rounded'>
                                <h3 className='text-xl font-semibold text-purple-300 mb-2'>Sample Input:</h3>
                                <textarea
                                    rows={6}
                                    className='w-full bg-black text-white font-mono p-2 rounded'
                                    placeholder="Enter sample input here"
                                ></textarea>
                                <Button className='mt-2'>Run</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Playground;
