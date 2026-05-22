import type { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  icon,
  align = 'left',
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <section className={`flex flex-col gap-stack-sm ${align === 'center' ? 'text-center items-center' : ''}`}>
      {icon}
      <h1 className="font-display-lg text-on-surface">{title}</h1>
      {description ? <p className="font-body-lg text-on-surface-variant max-w-2xl">{description}</p> : null}
    </section>
  );
}
