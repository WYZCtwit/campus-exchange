interface BentoGridProps {
  major: string
  concentration: string
  graduationYear: number
  grade: string
}

function BentoGrid({ major, concentration, graduationYear, grade }: BentoGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Academic Path Card */}
      <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-lg shadow-card flex flex-col justify-between group">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
            学术路径
          </span>
          <h3 className="font-headline font-bold text-3xl text-on-surface">
            {major}
          </h3>
        </div>
        <div className="flex items-center gap-4 mt-8">
          <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              主修方向
            </p>
            <p className="font-bold text-on-surface">{concentration}</p>
          </div>
        </div>
      </div>

      {/* Graduation Year Card */}
      <div className="bg-primary p-8 rounded-lg shadow-card text-on-primary flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">
            毕业年份
          </p>
          <h3 className="text-6xl font-headline font-black mt-2">{graduationYear}</h3>
        </div>
        <div className="relative z-10 flex items-center gap-2 mt-4">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            calendar_today
          </span>
          <span className="font-bold">{grade}</span>
        </div>
        {/* Abstract Gradient Swirl */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full opacity-30 blur-2xl" />
      </div>
    </section>
  )
}

export default BentoGrid
