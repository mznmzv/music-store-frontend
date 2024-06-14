import { useEffect } from 'react'
import exitIcon from '../assets/exit.svg'

export const Modal = ({ active, handleClose, children }) => {
    useEffect(() => {
        window.addEventListener('keydown', e => {
            e.key === 'Escape' && handleClose()
        })
    }, [])
    if (!active) return null

    return (
        <div
            className='flex items-center justify-center w-full fixed inset-0 bg-black/10'
            onClick={handleClose}
        >
            <div
                className='bg-white w-full mx-4 max-w-[350px] rounded-lg relative'
                onClick={e => e.stopPropagation()}
            >
                {children}
                <button
                    className='absolute top-2 right-2 border border-gray-300 w-7 h-6 rounded-lg flex justify-center items-center hover:border-gray-400'
                    onClick={handleClose}
                >
                    <img src={exitIcon} alt='Esc' />
                </button>
            </div>
        </div>
    )
}
