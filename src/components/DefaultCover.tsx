import { useId } from 'react';

type CoverType = 'competition' | 'activity' | 'project' | 'skill' | 'item';

interface DefaultCoverProps {
  title: string;
  type?: CoverType;
  className?: string;
}

const gradients: Record<CoverType, string[]> = {
  competition: ['#60a5fa', '#1e40af'],
  activity: ['#f87171', '#991b1b'],
  project: ['#a78bfa', '#5b21b6'],
  skill: ['#34d399', '#047857'],
  item: ['#fbbf24', '#b45309']
};

export function DefaultCover({ title, type = 'project', className = '' }: DefaultCoverProps) {
  const uid = useId();
  const [color1, color2] = gradients[type];
  const gradientId = `g1-${uid}`;
  const patternId = `pat-${uid}`;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-800 to-gray-900 flex items-center flex-col justify-center px-6 py-4 ${className}`}>

      <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
         <defs>
           <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor={color1} />
             <stop offset="100%" stopColor={color2} />
           </linearGradient>
           <pattern id={patternId} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
             {type === 'competition' && <path d="M0 30L30 0H15L0 15M30 30V15L15 30" fill={color1} fillOpacity="0.4"/>}
             {type === 'activity' && <circle cx="15" cy="15" r="6" fill={color1} fillOpacity="0.5"/>}
             {type === 'project' && <><rect x="0" y="0" width="15" height="15" fill={color1} fillOpacity="0.3"/><rect x="15" y="15" width="15" height="15" fill={color2} fillOpacity="0.3"/></>}
             {type === 'skill' && <polygon points="15,0 30,15 15,30 0,15" fill={color1} fillOpacity="0.4"/>}
             {type === 'item' && <rect x="2" y="2" width="26" height="26" rx="6" fill={color1} fillOpacity="0.3"/>}
           </pattern>
         </defs>

         <rect width="100%" height="100%" fill={`url(#${patternId})`} />
         <circle cx="85%" cy="15%" r="50%" fill={`url(#${gradientId})`} opacity="0.6" filter="blur(60px)" />
         <circle cx="15%" cy="85%" r="40%" fill={color1} opacity="0.4" filter="blur(50px)" />
      </svg>

      <div className="z-10 bg-white/10 backdrop-blur-md w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl mb-3 md:mb-4 text-white hover:scale-110 transition-transform duration-500">
        <span className="material-symbols-outlined text-3xl md:text-4xl text-white/90">
          {type === 'competition' ? 'emoji_events' : type === 'activity' ? 'celebration' : type === 'skill' ? 'auto_awesome' : type === 'item' ? 'shopping_bag' : 'work'}
        </span>
      </div>

      <div className="z-10 text-center w-full">
        <h3 className="text-white/95 font-extrabold text-lg md:text-xl tracking-wide line-clamp-2 drop-shadow-md leading-tight">
          {title}
        </h3>
        <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mt-3 shadow-sm"></div>
      </div>

    </div>
  );
}
