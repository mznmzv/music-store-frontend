export const DealItem = ({ type, deal }) => {
    console.log(deal)
    return (
        <div className='mx-auto justify-between'>
            <div className='bg-white p-5 flex flex-col rounded-xl h-full justify-between shadow-lg'>
                {type === 'mySell' && (
                    <h1>
                        Покупатель: <b>{deal.buyer}</b>
                    </h1>
                )}
                {type === 'myBuy' && (
                    <h1>
                        Продавец: <b>{deal.seller}</b>
                    </h1>
                )}
                <h1>
                    Цена: <b>{deal.price}</b>
                </h1>

                {type === 'mySell' && (
                    <h1>
                        Телефон покупателя: <b>{deal.buyerTel}</b>
                    </h1>
                )}
                {type === 'myBuy' && (
                    <h1>
                        Телефон продавца: <b>{deal.sellerTel}</b>
                    </h1>
                )}
                {type === 'myBuy' && (
                    <h1>
                        Адрес продавца: <b>{deal.sellerAdress}</b>
                    </h1>
                )}
                {type === 'mySell' && (
                    <h1>
                        Адрес покупателя: <b>{deal.buyerAdress}</b>
                    </h1>
                )}
            </div>
        </div>
    )
}
