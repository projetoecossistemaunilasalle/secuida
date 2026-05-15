import type { ReactNode } from 'react';

export function ActionCard({
  icon,
  label,
  description,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low hover:border-secondary active:scale-[0.98] transition-colors duration-200 rounded-xl min-h-[84px] px-5 py-4 flex items-start text-left gap-4 shadow-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="mt-1 shrink-0 text-secondary group-hover:scale-110 transition-transform">{icon}</span>
      <span className="flex flex-col gap-1">
        <span className="font-headline-sm text-on-surface">{label}</span>
        <span className="font-body-md text-on-surface-variant">{description}</span>
      </span>
    </button>
  );
}

