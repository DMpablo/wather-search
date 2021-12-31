import React from 'react'

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center">
        <div
          className="spinner-border mt-5"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
}
