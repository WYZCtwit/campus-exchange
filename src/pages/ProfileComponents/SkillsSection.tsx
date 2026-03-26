interface Skill {
  name: string
  color: 'primary' | 'secondary' | 'tertiary' | 'error'
}

interface SkillsSectionProps {
  skills: Skill[]
  onViewCerts?: () => void
}

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
}

function SkillsSection({ skills, onViewCerts }: SkillsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h4 className="font-headline font-bold text-2xl text-on-surface">
          专业技能与特长
        </h4>
        <button
          onClick={onViewCerts}
          className="text-primary font-bold text-sm cursor-pointer hover:underline"
        >
          查看证书
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-surface-container-lowest px-6 py-3 rounded-full shadow-card font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105"
          >
            <div className={`w-2 h-2 rounded-full ${colorMap[skill.color]}`} />
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
