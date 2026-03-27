import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostSkill from './PostSkill'
import PostItem from './PostItem'

type PostTab = 'skill' | 'item'

function Post() {
  const [activeTab, setActiveTab] = useState<PostTab>('skill')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface">
      {/* Top App Bar - Custom for Post Page */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-on-surface-variant hover:text-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">
              发布中心
            </h1>
          </div>
          <button
            className="font-headline font-bold text-primary active:scale-95 transition-all"
            onClick={() => {
              // Trigger form submission in child component
              const submitEvent = new CustomEvent('post-submit')
              window.dispatchEvent(submitEvent)
            }}
          >
            发布
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center pb-4">
          <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1 items-center">
            <button
              onClick={() => setActiveTab('skill')}
              className={`
                px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
                ${
                  activeTab === 'skill'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }
              `}
            >
              技能互换
            </button>
            <button
              onClick={() => setActiveTab('item')}
              className={`
                px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
                ${
                  activeTab === 'item'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }
              `}
            >
              校园集市
            </button>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <div className="pb-4">
        {activeTab === 'skill' ? <PostSkill /> : <PostItem />}
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary-container/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  )
}

export default Post
