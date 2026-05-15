import type { HTMLAttributes, ReactNode } from 'react';

export function Card({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

