import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import TeamSquare from './pages/TeamSquare'
import TeamDetail from './pages/TeamDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="teams" element={<TeamSquare />} />
        <Route path="teams/:id" element={<TeamDetail />} />
      </Route>
    </Routes>
  )
}

export default App
