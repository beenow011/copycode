'use client';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { PlaygroundContext } from '@/context/playground';
import { LoaderPinwheel } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

function CodeSearch() {
    const [question, setQuestion] = useState('');
    const [language, setLanguage] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [example, setExample] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [constraints, setConstraint] = useState('')
    const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
    const [load1, setLoad1] = useState(false)
    const route = useRouter()
    const [code, setCode] = useState('');
    const { data, setData } = useContext(PlaygroundContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            language,
            question,
            inputFormat,
            outputFormat,
            example,
            codeSnippet
        });
        setLoad1(true)
        fetch('/api/code', {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({
                language,
                question,
                inputFormat,
                outputFormat,
                example,
                codeSnippet,
                constraints,
                model: selectedModel
            }), // Send the question as JSON in the body
        })
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setCode(data.result); // Set the response data to state
                console.log(data.result); // Log the result
                setLoad1(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoad1(false)
            });
    };
    const languages = [
        'JavaScript', 'Python', 'Java', 'C++', 'C', 'Ruby', 'Go', 'Swift', 'Kotlin', 'PHP', 'TypeScript', 'Rust'
    ];

    // console.log(code)
    const { toast } = useToast()

    const copyCode = () => {
        navigator.clipboard.writeText(code.substring(3, code.length - 3))
        toast({
            title: "Code copied to your keyboard.",
            description: "You can directly paste the code.",

        })
    }

    const goToPlayGround = () => {
        setData({
            language,
            question,
            inputFormat,
            outputFormat,
            example,
            codeSnippet,
            code,
            constraints
        })
        route.push('/code/playground')
    }

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-purple-600">Code Challenge</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="language" className="block text-lg font-semibold mb-2 text-gray-700">Programming Language</label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                    >
                        <option value="">Select a language</option>
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question <span className='text-red-500 text-xs'>required</span></label>
                    <textarea
                        id="question"
                        value={question}
                        required
                        onChange={(e) => setQuestion(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={4}
                        placeholder="Describe the problem you are trying to solve."
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-700">Input Format</label>
                    <textarea
                        id="inputFormat"
                        value={inputFormat}
                        onChange={(e) => setInputFormat(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={2}
                        placeholder="Specify the format of the input."
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700">Output Format</label>
                    <textarea
                        id="outputFormat"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={2}
                        placeholder="Specify the format of the output."
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="example" className="block text-sm font-medium text-gray-700">Example</label>
                    <textarea
                        id="example"
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={4}
                        placeholder="Provide an example input and output."
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="constraints" className="block text-sm font-medium text-gray-700">Constraints</label>
                    <textarea
                        id="constraints"
                        value={constraints}
                        onChange={(e) => setConstraint(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={4}
                        placeholder="Provide constraints."
                    />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <label htmlFor="codeSnippet" className="block text-sm font-medium text-gray-700">Code Snippet</label>
                    <textarea
                        id="codeSnippet"
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={6}
                        placeholder="Paste your code snippet here."
                    />
                </div>
                <select
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    className='mb-6 p-2 rounded-lg bg-gray-300 text-black w-full md:w-96'
                >
                    <option value="gpt-4o-mini">GPT-4o-mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-4">GPT-4</option>

                </select>
                <p className="text-yellow-600 text-sm mb-4">
                    For better and cost-effective implementation, consider using the 4o-mini model.
                </p>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={question.length === 0}
                >
                    Submit
                </button>
            </form>
            {
                load1 ? (
                    <div className='w-full flex mt-7 justify-center items-center'>
                        <LoaderPinwheel className='h-8 w-8 text-purple-600 animate-spin' />
                    </div>
                ) : code && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold text-purple-600 mb-4">Code Result <span className='text-xs '>{selectedModel}</span></h3>
                        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                            <code>{code.substring(3, code.length - 3)}</code>
                        </pre>
                        <div className='flex justify-between'>
                            <button
                                onClick={copyCode}
                                className="mt-3 bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Copy Code
                            </button>
                            <button
                                onClick={goToPlayGround}
                                className="mt-3 bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Play Ground
                            </button>
                        </div>
                        <p className="mt-3 text-gray-600 text-sm">
                            <strong>Disclaimer:</strong> The code provided is generated by AI and may contain errors. Please review and test thoroughly.

                        </p>
                        <p className='text-green-600 text-sm'>
                            go to playground to play with your code, run the code and custom testcases.
                        </p>
                    </div>
                )
            }
        </div>
    );



}

export default CodeSearch