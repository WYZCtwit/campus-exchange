interface StatItem {
  value: string | number
  label: string
  onClick?: () => void
}

interface StatsOverviewProps {
  stats: StatItem[]
}

function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const clickable = typeof stat.value === 'number' && stat.value > 0 && stat.onClick
        const Wrapper = clickable ? 'button' : 'div'
        return (
          <Wrapper
            key={index}
            {...(clickable ? { onClick: stat.onClick } : {})}
            className={`text-center p-6 bg-surface-container-lowest rounded-lg shadow-card ${
              clickable
                ? 'cursor-pointer hover:bg-surface-container-low active:scale-95 transition-all'
                : ''
            }`}
          >
            <p className="text-3xl font-black text-primary">{stat.value}</p>
            <p className="text-sm font-bold text-on-surface-variant uppercase tracking-tight">
              {stat.label}
            </p>
          </Wrapper>
        )
      })}
    </section>
  )
}

export default StatsOverview
