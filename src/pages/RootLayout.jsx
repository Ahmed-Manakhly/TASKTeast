/* eslint-disable react/prop-types */
import {Outlet } from 'react-router-dom' ;
import Sidebar from '../components/UI/Sidebar' ;
// import classes from './RootLayout.module.scss' ;
import Topbar from '../components/UI/Topbar'
// import { ToastContainer } from "react-toastify";
import ScrollToTop from '../components/UI/ScrollToTop'


const RootLayout = ({handleSearch , searchTitle}) => {
    //----------------------------------------
    return (
        <div className='app'>
            {/* <ToastContainer position="top-center" /> */}
            <Sidebar/>
            <ScrollToTop />
            <main className='content'>
                <Topbar handleSearch={handleSearch} searchTitle={searchTitle}/>
                <Outlet/>
            </main>
        </div>
    )
} ;
export default RootLayout ;