import { Layout } from './components/Layout'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { MarketPage } from './pages/MarketPage'
import { CollectionPage } from './pages/CollectionPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, getMe } from './store/features/authSlice'
import { DealsPage } from './pages/DealsPage'

function App() {
    const dispatch = useDispatch()
    const { releaseStatus } = useSelector(state => state.release)
    const { dealStatus } = useSelector(state => state.deal)
    const isAuth = useSelector(checkAuth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        toast(releaseStatus)
    }, [releaseStatus])

    useEffect(() => {
        toast(dealStatus)
    }, [dealStatus])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={!isAuth && <RegisterPage />} />
                <Route
                    path='collection'
                    element={isAuth && <CollectionPage />}
                />
                <Route path='market' element={isAuth && <MarketPage />} />
                <Route path='deals' element={isAuth && <DealsPage />} />
            </Routes>
            <ToastContainer position='bottom-right' />
        </Layout>
    )
}

export default App
