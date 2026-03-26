interface ProfileHeaderProps {
  avatarUrl: string
  name: string
  bio?: string
}

function ProfileHeader({ avatarUrl, name, bio }: ProfileHeaderProps) {
  return (
    <section className="relative">
      <div className="bg-surface-container-low rounded-lg p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center md:items-end gap-8">
        {/* Large Avatar */}
        <div className="relative z-10">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden shadow-card border-4 border-surface-container-lowest rotate-2">
            <img
              alt={`${name} Profile`}
              className="w-full h-full object-cover"
              src={avatarUrl}
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">
            {name}
          </h2>
          {bio && (
            <p className="text-on-surface-variant text-lg font-body max-w-xl">
              {bio}
            </p>
          )}
        </div>
      </div>
      {/* Decorative Accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl" />
    </section>
  )
}

export default ProfileHeader
