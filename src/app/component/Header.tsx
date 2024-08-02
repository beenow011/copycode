"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function NavigationMenuDemo() {
    return (
        <div className="bg-purple-600 text-white rounded-lg shadow-lg mb-9">
            <ul className="flex gap-4 justify-center p-4">
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