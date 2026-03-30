import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

// Eagerly loaded (used on first paint)
// Layout, Home are in the initial bundle

// Lazy loaded — only fetched when the user navigates to each route
const Home = lazy(() => import('./pages/Home'))
const Exchange = lazy(() => import('./pages/Exchange'))
const Profile = lazy(() => import('./pages/Profile'))
const EditProfile = lazy(() => import('./pages/EditProfile'))
const Post = lazy(() => import('./pages/Post'))
const TeamSquare = lazy(() => import('./pages/TeamSquare'))
const TeamDetail = lazy(() => import('./pages/TeamDetail'))
const PostTeam = lazy(() => import('./pages/PostTeam'))
const MessagesList = lazy(() => import('./pages/MessagesList'))
const ChatRoom = lazy(() => import('./pages/ChatRoom'))
const Notifications = lazy(() => import('./pages/Notifications'))
const SkillDetail = lazy(() => import('./pages/SkillDetail'))
const ItemDetail = lazy(() => import('./pages/ItemDetail'))
const MyListings = lazy(() => import('./pages/profile/MyListings'))
const OrderList = lazy(() => import('./pages/OrderList'))
const OrderDetail = lazy(() => import('./pages/OrderDetail'))

/** Minimal spinner shown while a lazy route chunk loads */
function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="my-listings" element={<MyListings />} />
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
    </Suspense>
  )
}

export default App
