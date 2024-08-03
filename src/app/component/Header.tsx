"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation";


export function NavigationMenuDemo() {
    const route = useRouter()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div className="bg-purple-600 text-white md:flex justify-between rounded-lg shadow-lg mb-9">
            <div className="p-4 flex items-center justify-between">
                <div className="flex gap-2 items-center hover:scale-105 transition-transform" onClick={() => route.push('/')}>
                    <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 rounded-full p-1 hover:bg-gradient-to-l transition">
                        <Image src={'/solvelogo.png'} alt="logo" height={50} width={50} className="rounded-full" />
                    </div>
                    <h1 className="text-2xl font-bold cursor-default">SolveSphere AI</h1>
                </div>

                <button
                    className="text-white lg:hidden flex items-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <ul
                className={`lg:flex lg:gap-4 lg:justify-center lg:p-4 lg:mt-0 mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}
            >
                <li className="relative group">
                    <Link href={'/'} className="block py-3 px-6 text-lg font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300">
                        MCQ
                    </Link>
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="relative group">
                    <Link href={'/scan'} className="block py-3 px-6 text-lg font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300">
                        Scan Question
                    </Link>
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="relative group">
                    <Link href={'/code'} className="block py-3 px-6 text-lg font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300">
                        Code
                    </Link>
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
            </ul>
        </div>
    );


}