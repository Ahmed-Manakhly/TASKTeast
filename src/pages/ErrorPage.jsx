import Sidebar from '../components/UI/Sidebar' ;
import Topbar from '../components/UI/Topbar' ;
// import classes from './ErrorPage.module.scss' ;

const ErrorPage = () => {
    //-------------------------------------------------

    return(
        <div className='app'>
            <Sidebar/>
            <main className='content' >
            <Topbar/>
                    <h1>Something went wrong!</h1>
            </main>
        </div>
    )
} ;
export default ErrorPage ;