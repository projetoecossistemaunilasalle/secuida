import type { ReactNode } from 'react';
import { RouteTransition } from '../../app/shell/RouteTransition';

export function Page({
  children,
  className = '',
  width = 'wide',
}: {
  children: ReactNode;
  className?: string;
  width?: 'narrow' | 'wide';
}) {
  const maxWidth = width === 'narrow' ? 'max-w-3xl' : 'max-w-7xl';

  return (
    <RouteTransition
      className={`${maxWidth} mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-stack-md pb-28 md:pb-stack-lg flex flex-col gap-stack-lg w-full ${className}`}
    >
      {children}
    </RouteTransition>
  );
}
