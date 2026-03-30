import { useState, useRef } from 'react';

const colors = [
  'from-rose-400 to-red-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-cyan-400 to-blue-500',
  'from-indigo-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
  'from-violet-400 to-fuchsia-500',
  'from-blue-400 to-indigo-500'
];

function getStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

interface AvatarProps {
  src?: string | null;
  name?: string;
  sizeClass?: string;
  className?: string;
}

export function Avatar({ src, name = '?', sizeClass = 'w-10 h-10', className = '' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const prevSrcRef = useRef(src);

  if (prevSrcRef.current !== src) {
    prevSrcRef.current = src;
    setImgError(false);
  }

  const colorIndex = getStringHash(name) % colors.length;
  const gradientClass = colors[colorIndex];
  const cleanName = name.trim();
  const firstLetter = cleanName.length > 0 ? cleanName.charAt(0).toUpperCase() : '?';

  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 relative flex items-center justify-center text-white shadow-inner select-none ${sizeClass} ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover relative z-10"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center font-bold`}>
          <span style={{ fontSize: '1.2em' }} className="drop-shadow-sm leading-none">{firstLetter}</span>
        </div>
      )}
    </div>
  );
}
