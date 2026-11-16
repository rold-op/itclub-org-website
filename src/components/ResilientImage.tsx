import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#017278]/20 via-[#1E2430]/30 to-[#0D1117]/40 text-center p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#017278]/15 text-[#2DD4BF] mb-3">
          <Code2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-[var(--ink)] max-w-[22ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
