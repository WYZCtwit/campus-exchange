function Home() {
  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="space-y-2">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          发现身边的宝藏技能
        </h2>
        <p className="text-on-surface-variant font-body">
          在校园里，每个人都是彼此的老师。
        </p>
      </section>

      {/* Skill Cards Placeholder */}
      <div className="space-y-6">
        <p className="text-on-surface-variant text-center py-12">
          技能卡片列表将在这里显示...
        </p>
      </div>
    </div>
  )
}

export default Home
