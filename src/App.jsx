import {ColorModeContext , useMode} from './theme' ;
import {CssBaseline , ThemeProvider} from '@mui/material' ;
import {useState} from 'react'
//------------------------------------
import {createBrowserRouter , RouterProvider } from 'react-router-dom' ;
import RootLayout from './pages/RootLayout' ;
import ErrorPage from './pages/ErrorPage' ;
//--------------------pages >
import Dashboard  from './pages/Dashboard' ;
//======> users
import Users, {loader as UsersLoader ,action as deleteAction ,deActivateaction,activateaction} from './pages/Users/Users' ;
import AddEditUser,{action as manipulateUser}from './pages/Users/AddEditUser' ;
import ChangePassword ,{action as changePassword} from './pages/Users/ChangePassword' ;
import UserDetails from './pages/Users/UserDetails' ;
//======> Branchs
import Branchs , {loader as BranchsLoader , action as deleteBranchAction}  from './pages/Branchs/Branchs' ;
import AddEditBranch , {action as manipulateBranch}  from './pages/Branchs/AddEditBranch' ;
import BranchDetails from './pages/Branchs/BranchDetails' ;

//---------------------------
import Groups from './pages/Groups' ;
import Rights from './pages/Rights' ;
import Doctors from './pages/Doctors' ;
import Exams from './pages/Exams' ;
import Priority from './pages/Priority' ;
import Procedure from './pages/procedure' ;

//-------------------------------


const App = () => {
  const [theme , colorMode] = useMode() ;

  //--------- pass data to edit
  const [usersData, setUsersData] = useState([]);
  const getUsersData = (data) => {
    setUsersData(data) ;
  }
  const [branchsData, setBranchsData] = useState([]);
  const getBranchsData = (data) => {
    setBranchsData(data) ;
  }
  const [searchedVal,setSearchedVal]  = useState('');
  const [searchTitle,setSearchTitle]  = useState('');
  const handleSearch= (val)=>{setSearchedVal(val)}
  const searchedTitle = (val)=>{setSearchTitle(val)}

  //--------------------------------------------/ routes
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout handleSearch={handleSearch} searchTitle={searchTitle}/>  , errorElement : <ErrorPage/> ,children:[
        {index : true , element : <Dashboard/> },
        {path: 'users', children:[
          {index : true ,element : <Users  liftData={getUsersData} searchedVal={searchedVal} searchedTitle={searchedTitle}/>  ,id:'usersData' , loader : UsersLoader },
          {path:'new' , element: <AddEditUser/>,action :manipulateUser },
          {path:'edit/:userID' , element: <AddEditUser  getingData={usersData}/> , action :manipulateUser},
          {path: "view/:userName" , element: <UserDetails  getingData={usersData}/>},
          {path: "changePassword/:userID" , element: <ChangePassword  /> ,  action :changePassword},
        ]},
        {path: 'branchs', children:[
          {index: true ,element : <Branchs  liftData={getBranchsData} searchedVal={searchedVal} searchedTitle={searchedTitle}/> ,id:'branchsData' , loader : BranchsLoader},
          {path:'new' , element: <AddEditBranch/>,action :manipulateBranch },
          {path:'edit/:branchID' , element: <AddEditBranch getingData={branchsData} />,action :manipulateBranch },
          {path: "view/:branchID" , element: <BranchDetails  getingData={branchsData}/>},
        ] },
        {path: 'groups', element : <Groups/> },
        {path: 'rights', element :<Rights/>  },
        {path: 'doctors', element : <Doctors/> },
        {path: 'exams', element : <Exams/> },
        {path: 'priority', element : <Priority/> },
        {path: 'procedure', element :<Procedure/>  },
        {/*actions routes for users*/},
        {path : 'delete', action: deleteAction},
        {path : 'deactivate', action: deActivateaction},
        {path : 'activate', action: activateaction},
        {/*actions routes for Branchs*/},
        {path : 'deleteBranch', action: deleteBranchAction},
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