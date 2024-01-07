import React from 'react'

function Button({props}: any) {
  return (
    <button
      className="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={() => {
        props
      }}
    >
      Logout
    </button>
  )
}

export default Button