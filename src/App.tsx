import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Post from './pages/Post'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post" element={<Post />} />
      </Route>
    </Routes>
  )
}

export default App
