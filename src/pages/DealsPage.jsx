import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDeals } from '../store/features/dealSlice'
import { DealItem } from '../components/DealItem'

export const DealsPage = () => {
    const dispatch = useDispatch()
    const { dealList } = useSelector(state => state.deal)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getUserDeals())
    }, [dispatch])

    if (!user || !dealList) {
        return (
            <div className='text-lg m-auto'>
                <div>Loading...</div>
            </div>
        )
    }

    const myBuys = dealList?.filter(item => item.buyer === user.username)
    const mySells = dealList?.filter(item => item.seller === user.username)

    return (
        <div className='container mt-28'>
            <div className='gap-5 justify-between flex sm:gap-20 text-sm'>
                <div>
                    <h2 className='text-lg font-bold text-center mb-5'>
                        Мои покупки:
                    </h2>
                    <ul className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5'>
                        {myBuys?.map((item, ind) => (
                            <li key={ind}>
                                <DealItem type={'myBuy'} deal={item} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg font-bold text-center mb-5'>
                        Мои продажи:
                    </h2>
                    <ul className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-5'>
                        {mySells?.map((item, ind) => (
                            <li key={ind}>
                                <DealItem type={'mySell'} deal={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
