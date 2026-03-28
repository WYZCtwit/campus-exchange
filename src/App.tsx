import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Post from './pages/Post'
import TeamSquare from './pages/TeamSquare'
import TeamDetail from './pages/TeamDetail'
import PostTeam from './pages/PostTeam'
import MessagesList from './pages/MessagesList'
import ChatRoom from './pages/ChatRoom'
import Notifications from './pages/Notifications'
import SkillDetail from './pages/SkillDetail'
import ItemDetail from './pages/ItemDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="post" element={<Post />} />
        <Route path="teams" element={<TeamSquare />} />
        <Route path="post-team" element={<PostTeam />} />
        <Route path="teams/:id" element={<TeamDetail />} />
        <Route path="chat" element={<MessagesList />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="skill/:id" element={<SkillDetail />} />
        <Route path="item/:id" element={<ItemDetail />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="order/:id" element={<OrderDetail />} />
      </Route>
      {/* Chat room uses separate layout without bottom nav */}
      <Route path="/chat/:conversationId" element={<ChatRoom />} />
    </Routes>
  )
}

export default App
