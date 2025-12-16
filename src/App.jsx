import './App.css'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router'
import NotFound from './components/NotFound/NotFound'
import BottomNavBar from './components/BottomNavBar/BottomNavBar'
import Discover from './components/Discover/Discover'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import AccountPage from './components/AccountPage/AccountPage'
import Watchlist from './components/WatchlistIndex/WatchlistIndex'
import PartiesIndex from './components/PartiesIndex/Parties'

const App = () => {
  return (
    <>
    <NavBar />
    <main>
      <Routes>
        <Route path='/movies' element={<Discover/>}/>
        <Route path='/auth/sign-up/' element={<SignUp/>}/>
        <Route path='/auth/sign-in/' element={<SignIn/>}/>
        <Route path='/auth/account/' element={<AccountPage/>}/>
        <Route path='/watchlist/' element={<Watchlist/>}/>
        <Route path='/parties' element={<PartiesIndex/>}/>

        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </main>
    <BottomNavBar/>
  </>
  )
}

export default App
