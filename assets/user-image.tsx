import * as React from "react"
const UserImage = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <circle cx={16} cy={16} r={16} fill="#64748B" />
            <path
                fill="#CBD5E1"
                fillRule="evenodd"
                d="M4.614 27.241c.9-3.399 3.28-6.196 6.41-7.657A5.884 5.884 0 0 0 16 22.324a5.884 5.884 0 0 0 4.977-2.74 11.804 11.804 0 0 1 6.409 7.657A15.951 15.951 0 0 1 16 32c-4.455 0-8.485-1.82-11.386-4.759Z"
                clipRule="evenodd"
            />
            <ellipse cx={16} cy={14.5} fill="#CBD5E1" rx={5} ry={5.5} />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h32v32H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default UserImage;

