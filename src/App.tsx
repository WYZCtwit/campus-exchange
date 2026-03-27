import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Profile from './pages/Profile'
import Post from './pages/Post'
import TeamSquare from './pages/TeamSquare'
import TeamDetail from './pages/TeamDetail'
import MessagesList from './pages/MessagesList'
import ChatRoom from './pages/ChatRoom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post" element={<Post />} />
        <Route path="teams" element={<TeamSquare />} />
        <Route path="teams/:id" element={<TeamDetail />} />
      </Route>
      {/* Chat routes - separate layout without bottom nav for chat room */}
      <Route path="/chat" element={<Layout />}>
        <Route index element={<MessagesList />} />
      </Route>
      <Route path="/chat/:conversationId" element={<ChatRoom />} />
    </Routes>
  )
}

export default App
