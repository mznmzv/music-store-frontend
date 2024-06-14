import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth, logout } from '../store/features/authSlice'
import { toast } from 'react-toastify'
import Hamburger from 'hamburger-react'
import logo from '../assets/logo.svg'
import { useState } from 'react'

export const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const isAuth = useSelector(checkAuth)

    const handleLogout = () => {
        dispatch(logout())
        setOpen(false)
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/')
    }

    return (
        <header className='pt-5'>
            {isAuth && (
                <button
                    onClick={() => setOpen(!isOpen)}
                    className='fixed z-50 right-4 top-4 border-2 border-gray-200 rounded-lg bg-white'
                >
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </button>
            )}
            <nav className='text-xl flex justify-between items-center'>
                <Link
                    to={'/'}
                    className='hover:translate-y-1 transition-transform mx-auto'
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <img className='w-[300px]' src={logo} alt='Soundshare' />
                </Link>
                {isAuth && (
                    <>
                        <div className='md:items-center hidden md:flex md:gap-10 justify-center md:flex-1'>
                            <NavLink
                                to={'/market'}
                                className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                            >
                                Маркет
                            </NavLink>
                            <NavLink
                                to={'/collection'}
                                className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                            >
                                Коллекция
                            </NavLink>
                            <NavLink
                                to={'/deals'}
                                className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                            >
                                Заказы
                            </NavLink>
                        </div>
                        <div
                            className={`rounded-2xl md:flex fixed inset-0 sm:-inset-full md:top-0 md:bottom-0 md:left-2/3 bg-white duration-300 transform ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        >
                            <ul className='flex gap-5 flex-col items-center justify-center h-full md:w-1/4'>
                                <li className='md:mb-10'>
                                    Пользователь: <b>{user.username}</b>
                                </li>
                                <li className='h-24 md:hidden'>
                                    <NavLink
                                        to={'/market'}
                                        className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                                    >
                                        Маркет
                                    </NavLink>
                                </li>
                                <li className='h-24 md:hidden'>
                                    <NavLink
                                        to={'/collection'}
                                        className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                                    >
                                        Коллекция
                                    </NavLink>
                                </li>
                                <li className='h-24 md:hidden'>
                                    <NavLink
                                        to={'/deals'}
                                        className='hover:text-blue-600 transition-all duration-[275ms] h-full flex items-center justify-center'
                                    >
                                        Заказы
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        className='bg-rose-500 px-6 py-3 transition-all duration-[375ms] text-white font-semibold rounded-xl shadow-md hover:bg-rose-600 focus:outline-none hover:scale-105'
                                        onClick={handleLogout}
                                    >
                                        Выйти
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}
