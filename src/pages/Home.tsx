import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SkillCard from '../components/SkillCard'
import SkeletonList from '../components/SkeletonCard'
import { useSkillsStore } from '../stores/skills.store'

function Home() {
  const navigate = useNavigate()
  const { cards, isLoading, error, fetchSkills } = useSkillsStore()

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const handleCardClick = (id: string) => {
    navigate(`/skill/${id}`)
  }

  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-surface-container-low to-surface-container-lowest p-6 border border-primary/5">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative space-y-2">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            发现身边的宝藏技能
          </h2>
          <p className="text-on-surface-variant font-body text-sm">
            在校园里，每个人都是彼此的老师。
          </p>
        </div>
      </section>

      {error && (
        <div className="bg-error-container/20 text-error px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
      )}

      {isLoading ? (
        <SkeletonList count={4} />
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">auto_awesome</span>
          <p className="text-on-surface-variant font-medium mb-2">还没有人发布技能</p>
          <button
            onClick={() => navigate('/post')}
            className="text-primary text-sm font-bold hover:underline cursor-pointer"
          >
            成为第一个分享者 →
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cards.map((card) => (
            <SkillCard
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
