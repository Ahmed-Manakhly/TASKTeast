import {ColorModeContext , useMode} from './theme' ;
import {CssBaseline , ThemeProvider} from '@mui/material' ;
//------------------------------------
import {createBrowserRouter , RouterProvider } from 'react-router-dom' ;
import RootLayout from './pages/RootLayout' ;
import ErrorPage from './pages/ErrorPage' ;
//--------------------pages
import Dashboard  from './pages/Dashboard' ;
import Users from './pages/Users' ;
import Branchs  from './pages/Branchs ' ;
import Groups from './pages/Groups' ;
import Rights from './pages/Rights' ;
import Doctors from './pages/Doctors' ;
import Exams from './pages/Exams' ;
import Priority from './pages/Priority' ;
import Procedure from './pages/procedure' ;
//-------------------------------


const App = () => {
  const [theme , colorMode] = useMode() ;
  //--------------------------------------------/ routes
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout/>  , errorElement : <ErrorPage/> ,children:[
        {index : true , element : <Dashboard/> },
        {path: 'users', element : <Users/>  },
        {path: 'branchs', element : <Branchs/> },
        {path: 'groups', element : <Groups/> },
        {path: 'rights', element :<Rights/>  },
        {path: 'doctors', element : <Doctors/> },
        {path: 'exams', element : <Exams/> },
        {path: 'priority', element : <Priority/> },
        {path: 'procedure', element :<Procedure/>  },
        ]
      }
    ]
  )
  //----------------------------------------------------/
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App ;