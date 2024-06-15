import { useDispatch, useSelector } from 'react-redux'
import {
    deleteRelease,
    resetRelease,
    setModalType,
} from '../store/features/releaseSlice'
import { deleteDeal, createBuyDeal } from '../store/features/dealSlice'

export const ReleaseInfo = ({ release, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const isMarket = window.location.pathname === '/market'
    const isOwner = release.owner === user._id
    const onSell = release.price !== ''
    const haveBuyer = release.buyer !== ''

    const handleBuy = () => {
        try {
            const data = new FormData()
            data.append('idBuyer', user._id)
            data.append('buyer', user.username)
            data.append('buyerTel', user.tel)
            data.append('buyerAdress', user.adress)
            data.append('idProduct', release._id)
            dispatch(createBuyDeal(data))
            handleClose()
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
                )}/uploads/${release.cover}`}
                alt='cover'
            />
            <div className='space-y-1 mb-2'>
                <h1>
                    Название: <b>{release.title}</b>
                </h1>
                <h1>
                    Исполнитель: <b>{release.artist}</b>
                </h1>
                <h1>
                    Жанры: <b>{release.genres}</b>
                </h1>
                <h1>
                    Год: <b>{release.year}</b>
                </h1>
                <h1>
                    Лейбл: <b>{release.label}</b>
                </h1>
                <h1>
                    Формат: <b>{release.format}</b>
                </h1>

                {isMarket && (
                    <>
                        <h1>
                            Продавец: <b>{release.username}</b>
                        </h1>
                        <h1>
                            Цена: <b>{release.price}</b>
                        </h1>
                    </>
                )}
            </div>
            <div className='flex gap-4'>
                {isMarket && !isOwner && (
                    <button
                        className='bg-green-400 px-4 py-2 transition-all duration-[375ms] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-green-500 focus:outline-none hover:scale-105'
                        onClick={() => {
                            dispatch(resetRelease())
                            handleBuy()
                            handleClose()
                        }}
                    >
                        Купить
                    </button>
                )}
                {!isMarket && !haveBuyer && (
                    <>
                        {!onSell && (
                            <button
                                className='bg-green-400 px-4 py-2 transition-all duration-[375ms] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-green-500 focus:outline-none hover:scale-105'
                                onClick={() => {
                                    dispatch(resetRelease())
                                    dispatch(setModalType('selling'))
                                }}
                            >
                                Продать
                            </button>
                        )}
                        <button
                            className='bg-orange-400 px-4 py-2 transition-all duration-[375ms] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-orange-500 focus:outline-none hover:scale-105'
                            onClick={() => {
                                dispatch(resetRelease())
                                dispatch(setModalType('edit'))
                            }}
                        >
                            Изменить
                        </button>
                    </>
                )}
                {!onSell ? (
                    <button
                        className='bg-rose-500 px-4 py-2 transition-all duration-[375ms] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-rose-600 focus:outline-none hover:scale-105'
                        onClick={() => {
                            dispatch(resetRelease())
                            dispatch(deleteRelease(release._id))
                            handleClose()
                        }}
                    >
                        Удалить
                    </button>
                ) : (
                    !haveBuyer &&
                    isOwner && (
                        <button
                            className='bg-rose-500 px-4 py-2 transition-all duration-[375ms] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-rose-600 focus:outline-none hover:scale-105'
                            onClick={() => {
                                dispatch(resetRelease())
                                dispatch(deleteDeal(release._id))
                                handleClose()
                            }}
                        >
                            Снять с продажи
                        </button>
                    )
                )}
            </div>
        </div>
    )
}
