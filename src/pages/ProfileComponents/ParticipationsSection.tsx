interface Participation {
  id: string
  imageUrl: string
  type: string
  typeColor: 'primary' | 'secondary'
  title: string
  role: string
  location: string
}

interface ParticipationsSectionProps {
  participations: Participation[]
}

const typeColorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
}

function ParticipationsSection({ participations }: ParticipationsSectionProps) {
  return (
    <section className="space-y-8">
      <h4 className="font-headline font-bold text-2xl text-on-surface">
        正在参与的项目
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {participations.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col gap-4 ${index % 2 === 1 ? 'md:mt-12' : ''}`}
          >
            <div className="h-64 rounded-lg overflow-hidden shadow-card bg-surface-container-low group">
              <img
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.imageUrl}
              />
            </div>
            <div className="px-2 space-y-2">
              <p className={`font-black text-xs uppercase tracking-widest ${typeColorMap[item.typeColor]}`}>
                {item.type}
              </p>
              <h5 className="font-headline font-bold text-xl leading-tight">
                {item.title}
              </h5>
              <div className="flex items-center gap-4 text-sm text-on-surface-variant pt-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {item.role}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ParticipationsSection
