import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { About } from './pages/about.jsx'
import { Home } from './pages/Home.jsx'
import { SignUp } from './pages/signUp.jsx'
import { Signin } from './pages/signin.jsx'
import { Profile } from './pages/profile.jsx'
import Navbar from './components/Navbar.jsx'
import Privateroute from './components/Privateroute.jsx'
import Create_list from './pages/Create_list.jsx'
import Update_list from './pages/Updatelisting.jsx'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'
function App() {

  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signUp' element={<SignUp/>}/>
    <Route path='/listing/:listingId' element={<Listing/>}/>
    <Route path='/search' element={<Search/>}/>


    <Route element={<Privateroute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/create-list' element={<Create_list/>}/>
    <Route path='/update-list/:listingId' element={<Update_list/>}/>
    </Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
