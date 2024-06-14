import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../components/Modal'
import { CollectionForm } from '../components/CollectionForm'
import { CreateProductForm } from '../components/CreateProductForm'
import { ReleaseItem } from '../components/ReleaseItem'
import { ReleaseInfo } from '../components/ReleaseInfo'
import {
    getCollection,
    setModalType,
    resetRelease,
} from '../store/features/releaseSlice'
import { Link } from 'react-router-dom'
import { MainButton } from '../components/MainButton'

export const CollectionPage = () => {
    const [modalActive, setModalActive] = useState(false)
    const [selectedRelease, setSelectedRelease] = useState(null)
    const dispatch = useDispatch()
    const { releaseList, typeModal, newRelease } = useSelector(
        state => state.release
    )
    const { newDeal } = useSelector(state => state.deal)

    const handleModal = (type, release) => {
        dispatch(setModalType(type))
        setSelectedRelease(release)
        setModalActive(true)
    }

    useEffect(() => {
        dispatch(getCollection())
    }, [dispatch, newRelease, newDeal])

    return (
        <div className='mx-auto container'>
            <div className='flex justify-center mt-10 mb-6'>
                <MainButton
                    onClick={() => {
                        handleModal('addRelease', null)
                        dispatch(resetRelease())
                    }}
                >
                    Добавить релиз
                </MainButton>
            </div>
            <div className='mx-auto w-full pb-10'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {releaseList?.map((release, ind) => {
                        return (
                            <Link
                                className='h-full'
                                onClick={() => handleModal('info', release)}
                                key={ind}
                            >
                                <ReleaseItem release={release} />
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <Modal
                active={modalActive}
                handleClose={() => setModalActive(false)}
            >
                {typeModal === 'addRelease' && (
                    <CollectionForm
                        type={typeModal}
                        handleClose={() => setModalActive(false)}
                    />
                )}
                {typeModal === 'info' && (
                    <ReleaseInfo
                        handleClose={() => setModalActive(false)}
                        release={selectedRelease}
                    />
                )}
                {typeModal === 'selling' && (
                    <CreateProductForm
                        handleClose={() => setModalActive(false)}
                        product={selectedRelease}
                    />
                )}
                {typeModal === 'edit' && (
                    <CollectionForm
                        release={selectedRelease}
                        type={typeModal}
                        handleClose={() => setModalActive(false)}
                    />
                )}
            </Modal>
        </div>
    )
}
