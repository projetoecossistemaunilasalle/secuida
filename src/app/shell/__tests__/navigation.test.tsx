import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BottomNav } from '../BottomNav';
import { TopBar } from '../TopBar';

describe('app navigation', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_ENABLE_DEV_DASHBOARD', 'false');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not show the dashboard link in the top bar by default', () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it('shows the dashboard link in the top bar when the dev flag is enabled', () => {
    vi.stubEnv('VITE_ENABLE_DEV_DASHBOARD', 'true');

    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
  });

  it('shows the dashboard link in the bottom navigation when the dev flag is enabled', () => {
    vi.stubEnv('VITE_ENABLE_DEV_DASHBOARD', 'true');

    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
  });
});
