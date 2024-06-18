import { Link } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { ReleaseItem } from '../components/ReleaseItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMarketProducts, setModalType } from '../store/features/releaseSlice'
import { ReleaseInfo } from '../components/ReleaseInfo'
import { toast } from 'react-toastify'

export const MarketPage = () => {
    const [modalActive, setModalActive] = useState(false)
    const [selectedRelease, setSelectedRelease] = useState(null)
    const { marketList, typeModal } = useSelector(state => state.release)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMarketProducts())
    }, [dispatch])

    const handleModal = (type, release = null) => {
        dispatch(setModalType(type))
        setSelectedRelease(release)
        setModalActive(true)
    }

    return (
        <div className='mx-auto pb-6'>
            <div className='flex justify-center mt-10 mb-6'>
                <Link
                    onClick={() => toast('Выберите релиз из коллекции')}
                    className='px-6 py-3 bg-green-400 transition-all duration-[375ms] text-white font-semibold rounded-xl shadow-md hover:bg-green-500 focus:outline-none hover:scale-105'
                    to={'/collection'}
                >
                    Добавить объявление
                </Link>
            </div>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {marketList?.map((release, ind) => {
                    return (
                        <Link
                            onClick={() => handleModal('info', release)}
                            className='h-full'
                            key={ind}
                        >
                            <ReleaseItem release={release} />
                        </Link>
                    )
                })}
            </ul>
            <Modal
                active={modalActive}
                handleClose={() => setModalActive(false)}
            >
                {typeModal === 'info' && (
                    <ReleaseInfo
                        handleClose={() => setModalActive(false)}
                        release={selectedRelease}
                    />
                )}
            </Modal>
        </div>
    )
}
