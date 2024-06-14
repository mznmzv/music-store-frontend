import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, resetStatus } from '../store/features/authSlice'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')
    const [adress, setAdress] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, status, regOk } = useSelector(state => state.auth)

    useEffect(() => {
        if (regOk) {
            setUsername('')
            setPassword('')
            setTel('')
            setAdress('')
            navigate('/login')
        }
        toast(status)
        dispatch(resetStatus())
    }, [status])

    const handleSubmit = () => {
        try {
            dispatch(register({ username, password, tel, adress }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className='m-auto max-w-[400px] border rounded-xl p-7 shadow-lg bg-white text-lg'
        >
            <h2 className='text-center text-xl'>Регистрация</h2>
            <div className='flex gap-2 mt-4'>
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
            <div className='flex flex-col gap-2 mt-2'>
                <label>
                    <InputField
                        type='tel'
                        value={tel}
                        onChange={e => setTel(e.target.value)}
                        placeholder='Телефон'
                    />
                </label>
                <label>
                    <InputField
                        type='text'
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                        placeholder='Адрес доставки'
                    />
                </label>
            </div>
            <div className='flex gap-7 items-center justify-between mt-5'>
                <button
                    className='bg-blue-400 p-2 px-3 transition-all duration-[375ms] hover:scale-105 rounded-xl text-white hover:bg-blue-500'
                    onClick={handleSubmit}
                >
                    Зарегистрироваться
                </button>
                <Link
                    className='hover:text-blue-400 transition-all duration-[275ms]'
                    to={'/login'}
                >
                    Есть аккаунт
                </Link>
            </div>
        </form>
    )
}
