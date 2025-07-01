import * as React from "react"
const CheckFill = (props: any) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    strokeLinejoin="round"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-4.47-1.47.53-.53L11 4.94l-.53.53L6.5 9.44l-.97-.97L5 7.94 3.94 9l.53.53 1.5 1.5a.75.75 0 0 0 1.06 0l4.5-4.5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CheckFill;
