import { Link } from 'react-router-dom'
import { MainButton } from '../components/MainButton'
import { useSelector } from 'react-redux'
import { checkAuth } from '../store/features/authSlice'
import charImg from '../assets/char-1.png'

export const MainPage = () => {
    const isAuth = useSelector(checkAuth)
    return (
        <main className='flex flex-col items-center justify-center flex-grow'>
            <div className='w-full'>
                <div className='flex flex-col md:flex-row items-center gap-10 lg:gap-32 justify-center mb-10'>
                    <p className='text-xl break-words w-full lg:w-[500px] sm:text-2xl text-center md:text-2xl xl:text-4xl font-bold'>
                        Музыка в один клик — каталогизируй, продавай, покупай
                    </p>
                    <div className='max-w-[600px]'>
                        <img src={charImg} alt='character' />
                    </div>
                </div>
                <Link
                    to={isAuth ? '/market' : '/login'}
                    className='flex justify-center mb-2 text-lg'
                >
                    <MainButton>Попробовать</MainButton>
                </Link>
            </div>
        </main>
    )
}
