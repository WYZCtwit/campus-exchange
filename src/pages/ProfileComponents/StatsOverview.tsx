interface StatItem {
  value: string | number
  label: string
}

interface StatsOverviewProps {
  stats: StatItem[]
}

function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-surface-container-lowest rounded-lg shadow-card"
        >
          <p className="text-3xl font-black text-primary">{stat.value}</p>
          <p className="text-sm font-bold text-on-surface-variant uppercase tracking-tight">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  )
}

export default StatsOverview
