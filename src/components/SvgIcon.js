import React from 'react'

const SvgIcon = ({ className, SVGString }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d={SVGString} />
    </svg>
  )
}

export default SvgIcon
