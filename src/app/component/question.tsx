'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ellipsis, GemIcon, Loader2, LoaderPinwheel } from 'lucide-react';
import React, { useState } from 'react'
import { json } from 'stream/consumers';

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
        <div className='text-white flex flex-col justify-center items-center'>
            <div className='text-xl md:text-3xl font-mono font-semibold mb-6 md:mb-12 text-purple-500'>
                Obtain answers for your multiple-choice questions using various AI endpoints.
            </div>
            <Textarea value={q} onChange={e => setQ(e.target.value)} className='text-black px-7 w-full md:w-96 h-96 mb-8' placeholder='question' />

            <div className='flex gap-2'>
                <Button onClick={run} className='mb-6'>Search</Button>
                <Button onClick={() => setQ('')} className='mb-6'>Clear</Button>
                <Button onClick={handlePaste} className='mb-6'>Paste</Button>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-80 md:w-96 bg-slate-600/50 rounded-md p-2'>
                    <div className='flex gap-2'>
                        <p className='text-purple-500 font-bold text-xl'>Gemini</p>
                        <LoaderPinwheel className={` h-6 w-6 ${load1 && 'animate-spin'} text-purple-500`} />
                    </div>
                    {
                        load1 ? <Ellipsis className=' h-5 w-6 text-purple-500' /> : (
                            res && <div>

                                <p>{res}</p></div>
                        )
                    }
                </div>
                <div className='w-80 md:w-96 bg-slate-600/50 rounded-md p-2'>
                    <div className='flex gap-2'>
                        <p className='text-purple-500 font-bold text-xl'>OpenAI</p>
                        <LoaderPinwheel className={` h-6 w-6 ${load2 && 'animate-spin'} text-purple-500`} />
                    </div>
                    {
                        load2 ? <Ellipsis className=' h-5 w-6 text-purple-500' /> : (
                            res2 && <div>

                                <p>{res2}</p></div>
                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default Question