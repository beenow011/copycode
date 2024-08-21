import { Ellipsis, LoaderPinwheel } from 'lucide-react'
import React from 'react'

function OutputRes({ load1, load2, res, res2, model = 'gpt-4o-mini' }: { load1: boolean, load2: boolean, res: string, res2: string, model: string }) {
    return (
        <div className='flex flex-col md:flex-row gap-6 w-full md:w-2/3'>
            <div className='w-full md:w-1/2 bg-gray-700 rounded-lg p-4 shadow-md'>
                <div className='flex items-center gap-2 mb-2'>
                    <p className='text-purple-300 font-semibold text-lg'>Gemini - <span className='text-purple-500/60'>gemini-1.5-flash</span> </p>
                    <LoaderPinwheel className={`h-6 w-6 ${load1 ? 'animate-spin' : ''} text-purple-300`} />
                </div>
                {load1 ? (
                    <Ellipsis className='h-6 w-6 text-purple-300' />
                ) : (
                    res && <p className='text-white'>{res}</p>
                )}
            </div>

            <div className='w-full md:w-1/2 bg-gray-700 rounded-lg p-4 shadow-md'>
                <div className='flex items-center gap-2 mb-2'>
                    <p className='text-purple-300 font-semibold text-lg'>OpenAI - <span className='text-purple-500/60'>{model}</span> </p>
                    <LoaderPinwheel className={`h-6 w-6 ${load2 ? 'animate-spin' : ''} text-purple-300`} />
                </div>
                {load2 ? (
                    <Ellipsis className='h-6 w-6 text-purple-300' />
                ) : (
                    res2 && <p className='text-white'>{res2}</p>
                )}
            </div>
        </div>
    )
}

export default OutputRes