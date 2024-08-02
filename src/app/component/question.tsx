'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ellipsis, GemIcon, Loader2, LoaderPinwheel } from 'lucide-react';
import React, { useState } from 'react'
import { json } from 'stream/consumers';
import OutputRes from './OutputRes';

function Question() {
    const [q, setQ] = useState('')
    const [res, setRes] = useState('')
    const [res2, setRes2] = useState('')
    const [load1, setLoad1] = useState(false)
    const [load2, setLoad2] = useState(false)
    const run = () => {
        setLoad1(true)
        setLoad2(true)
        fetch('/api/openAimcq', {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ question: q }), // Send the question as JSON in the body
        })
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setRes2(data.result); // Set the response data to state
                console.log(data.result); // Log the result
                setLoad1(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoad1(false)
            });

        fetch('/api/question', {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ question: q }), // Send the question as JSON in the body
        })
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setRes(data.result); // Set the response data to state
                console.log(data.result); // Log the result
                setLoad2(false)
            })
            .catch(err => {
                console.error('Error:', err)
                setLoad2(false)
            }); // Handle errors
    };


    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText(); // Read text from the clipboard
            setQ(text); // Update state with the pasted text
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };



    return (
        <div className='flex flex-col items-center justify-center bg-gray-800 text-white min-h-screen p-8'>
            <div className='text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-purple-400 text-center'>
                Obtain answers for your multiple-choice questions using various AI endpoints.
            </div>

            <Textarea
                value={q}
                onChange={e => setQ(e.target.value)}
                className='text-black px-4 py-3 w-full md:w-96 h-60 md:h-80 mb-6 bg-white rounded-lg shadow-lg border border-gray-200 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-300 ease-in-out'
                placeholder='Enter your question here'
            />


            <div className='flex gap-4 mb-6'>
                <Button
                    onClick={run}
                    className='bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-2 px-4 rounded-lg shadow-md'
                    disabled={q.length === 0}
                >
                    Search
                </Button>
                <Button
                    onClick={() => setQ('')}
                    className='bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300 py-2 px-4 rounded-lg shadow-md'
                >
                    Clear
                </Button>
                <Button
                    onClick={handlePaste}
                    className='bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 py-2 px-4 rounded-lg shadow-md'
                >
                    Paste
                </Button>
            </div>

            <OutputRes load1={load1} load2={load2} res={res} res2={res2} />
        </div>
    );

}

export default Question