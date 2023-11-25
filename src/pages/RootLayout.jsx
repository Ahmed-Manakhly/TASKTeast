import {Outlet } from 'react-router-dom' ;
import Sidebar from '../components/UI/Sidebar' ;
// import classes from './RootLayout.module.scss' ;
import Topbar from '../components/UI/Topbar'


const RootLayout = () => {
    //----------------------------------------
    return (
        <div className='app'>
            <Sidebar/>
            <main className='content'>
                <Topbar/>
                <Outlet/>
            </main>
        </div>
    )
} ;
export default RootLayout ;