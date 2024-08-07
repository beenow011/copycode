// 👇 available here: https://crotus.io/dashboard/primitive-components
// import { Stars } from "@/components/Stars"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export const Stars = ({
    rating,
    className,
}: {
    rating: number
    className?: string
}) => {
    return new Array(5).fill(null).map((_, i) => (
        <Star
            key={i}
            className={cn(className, "text-gray-300 size-5", {
                "text-[#FDB022]": i <= rating,
            })}
        />
    ))
}

interface StarProps extends HTMLAttributes<HTMLOrSVGElement> { }

const Star = (props: StarProps) => {
    return (
        <svg {...props} viewBox="0 0 20 20">
            <g clipPath="url(#clip0_264_330900)">
                <path
                    d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_264_330900">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

interface BasicStarReviewProps {
    rating: number
    text: string
}

export const BasicStarReview = ({ rating, text }: BasicStarReviewProps) => {
    return (
        <article
            itemScope
            itemType="https://schema.org/Review"
            className="flex flex-col items-center gap-1 w-96 bg-purple-900 rouded-lg text-white px-6 py-12 sm:py-16 lg:px-8"
        >
            <header>
                <h2 className="sr-only">Review</h2>
                <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
                    <Stars rating={rating} className="size-5" />
                </div>
                <meta itemProp="reviewRating" content={rating.toString()} />
            </header>

            <blockquote itemProp="reviewBody" className="max-w-prose text-center">
                <p className="text-lg font-bold text-gray-300">{text}</p>
            </blockquote>
        </article>
    )
}
