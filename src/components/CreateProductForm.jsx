import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSellDeal } from '../store/features/dealSlice'
import { InputField } from './InputField'

export const CreateProductForm = ({ product, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [price, setPrice] = useState('')

    const handleSubmit = () => {
        try {
            const data = new FormData()
            data.append('idSeller', product.owner)
            data.append('seller', user.username)
            data.append('sellerTel', user.tel)
            data.append('sellerAdress', user.adress)
            data.append('price', price)
            data.append('idProduct', product._id)
            dispatch(createSellDeal(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col px-4 gap-2 py-5'>
            <img
                className='pt-4'
                src={`${import.meta.env.VITE_API_URL.replace(
                    '/api',
                    ''
                )}/uploads/${product.cover}`}
                alt='cover'
            />
            <div className='space-y-1 mt-4 mb-2'>
                <h2>
                    Название: <b>{product.title}</b>
                </h2>
                <h2>
                    Исполнитель: <b>{product.artist}</b>
                </h2>
            </div>
            <div className='flex justify-center'>
                <form
                    className='max-w-[220px] flex flex-col gap-5'
                    onSubmit={e => e.preventDefault()}
                >
                    <label className='text-center'>
                        Цена:
                        <InputField
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            type='text'
                        />
                    </label>
                    <button
                        className='bg-green-400 px-4 py-2 transition-all duration-[375ms] text-white font-semibold rounded-xl shadow-md hover:bg-green-500 focus:outline-none hover:scale-105'
                        onClick={e => {
                            e.preventDefault()
                            !!Number(price) && handleClose()
                            handleSubmit()
                        }}
                    >
                        Выставить на маркет
                    </button>
                </form>
            </div>
        </div>
    )
}
