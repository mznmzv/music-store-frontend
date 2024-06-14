import React from 'react'

export const MainButton = ({ children, ...props }) => {
    return (
        <button
            onClick={props.onClick}
            className='px-6 py-3 bg-blue-400 transition-all duration-[375ms] text-white font-semibold rounded-xl shadow-md hover:bg-blue-500 focus:outline-none hover:scale-105'
        >
            {children}
        </button>
    )
}
