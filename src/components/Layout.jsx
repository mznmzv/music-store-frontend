import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
    return (
        <>
            <div className='container mx-auto min-h-screen flex flex-col'>
                <Navbar />
                {children}
            </div>
        </>
    )
}
