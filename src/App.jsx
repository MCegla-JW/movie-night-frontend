import './App.css'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router'
import NotFound from './components/NotFound/NotFound'
import BottomNavBar from './components/BottomNavBar/BottomNavBar'
import Discover from './components/Discover/Discover'

const App = () => {
  return (
    <>
    <NavBar />
    <main>
      <Routes>
        <Route path='/' element={<Discover/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </main>
    <BottomNavBar/>
  </>
  )
}

export default App
