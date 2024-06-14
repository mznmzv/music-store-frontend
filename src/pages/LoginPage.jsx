import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, login, resetStatus } from '../store/features/authSlice'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status } = useSelector(state => state.auth)
    const isAuth = useSelector(checkAuth)

    useEffect(() => {
        if (status) {
            toast(status)
            dispatch(resetStatus())
        }
        if (isAuth) {
            navigate('/collection')
        }
    }, [status, isAuth])

    const handleSubmit = () => {
        try {
            dispatch(login({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className='m-auto max-w-[400px] border rounded-xl p-7 shadow-lg bg-white text-lg'
        >
            <h2 className='text-center text-xl'>Авторизация</h2>
            <div className='mx-auto flex flex-col gap-2 mt-4 max-w-xs'>
                <label>
                    <InputField
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Логин'
                    />
                </label>
                <label>
                    <InputField
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Пароль'
                    />
                </label>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <button
                    className='bg-blue-400 p-2 px-4 transition-all duration-[375ms] hover:scale-105 rounded-xl text-white hover:bg-blue-500' 
                    onClick={handleSubmit}
                >
                    Войти
                </button>
                <Link
                    className='hover:text-blue-400 transition-all duration-[275ms]'
                    to={'/register'}
                >
                    Нет аккаунта
                </Link>
            </div>
        </form>
    )
}
