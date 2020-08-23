import React from 'react'

const NoDataControl = ({ title }) => {
  return (
    <div
      className="row justify-content-center align-self-center test-component"
      style={{ marginTop: '200px' }}
    >
      <div className="text-center">
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-archive"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z"
          />
          <path
            fillRule="evenodd"
            d="M5.5 7.5A.5.5 0 0 1 6 7h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1z"
          />
        </svg>
        <h5>
          <span className="text-muted"> {title} </span>
        </h5>
      </div>
    </div>
  )
}

export default NoDataControl
