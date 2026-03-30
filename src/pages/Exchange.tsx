import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import SkeletonList from '../components/SkeletonCard'
import { useItemsStore } from '../stores/items.store'

function Exchange() {
  const navigate = useNavigate()
  const { cards, isLoading, error, fetchItems } = useItemsStore()

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-surface-container-low to-surface-container-lowest p-6 border border-secondary/5">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative space-y-2">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            校园集市
          </h2>
          <p className="text-on-surface-variant font-body text-sm">
            二手好物，等你来淘。
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
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">shopping_bag</span>
          <p className="text-on-surface-variant font-medium mb-2">还没有人在售物品</p>
          <button
            onClick={() => navigate('/post')}
            className="text-primary text-sm font-bold hover:underline cursor-pointer"
          >
            成为第一个卖家 →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <ItemCard
              key={card.id}
              {...card}
              onClick={() => navigate(`/item/${card.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Exchange
