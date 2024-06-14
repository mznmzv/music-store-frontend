export const ReleaseItem = ({ release }) => {
    const isOrdered = release.buyer !== ''
    const onSell = release.price !== ''
    const isMarket = window.location.pathname === '/market'

    return (
        <div className='mx-auto h-full'>
            <div className='bg-white shadow-lg p-5 flex flex-col rounded-xl h-full justify-between hover:scale-105 transition-transform duration-300'>
                <img
                    src={`http://localhost:5000/${release.cover}`}
                    alt='cover'
                />
                <div className='space-y-2 mt-3 text-sm'>
                    {!isMarket && (
                        <>
                            {isOrdered && (
                                <span className='bg-lime-400 p-1 text-center block max-w-[100px] ml-auto rounded-md'>
                                    Заказано
                                </span>
                            )}
                            {onSell && !isOrdered && (
                                <span className='bg-green-400 p-1 text-center block max-w-[100px] ml-auto rounded-md'>
                                    Продается
                                </span>
                            )}
                        </>
                    )}
                    <h2>
                        Название: <b>{release.title}</b>
                    </h2>
                    <h2>
                        Исполнитель: <b>{release.artist}</b>
                    </h2>
                    {onSell && isMarket && (
                        <>
                            <h2>
                                Продавец: <b>{release.username}</b>
                            </h2>
                            <h2>
                                Цена: <b>{release.price}</b>
                            </h2>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
