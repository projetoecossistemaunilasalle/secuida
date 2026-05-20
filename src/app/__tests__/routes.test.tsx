import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Router } from '../router';

function renderRoute(initialEntry: string) {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Router />
    </MemoryRouter>,
  );
}

describe('Router', () => {
  it('renders the home route', () => {
    renderRoute('/');

    expect(screen.getByRole('heading', { name: /bem-vindo ao secuida/i })).toBeInTheDocument();
  });

  it('renders the orientation route', () => {
    renderRoute('/orientacao');

    expect(screen.getByRole('heading', { name: /antes de começar/i })).toBeInTheDocument();
  });

  it('renders the support route', () => {
    renderRoute('/apoio');

    expect(screen.getByRole('heading', { name: /você não está sozinho/i })).toBeInTheDocument();
  });

  it('renders the contacts route', () => {
    renderRoute('/contatos');

    expect(screen.getByRole('heading', { name: /rede de apoio em canoas/i })).toBeInTheDocument();
  });

  it('renders the education route', () => {
    renderRoute('/educacao');

    expect(screen.getByRole('heading', { name: /biblioteca de educação/i })).toBeInTheDocument();
  });

  it('renders the privacy route', () => {
    renderRoute('/privacidade');

    expect(screen.getByRole('heading', { name: /privacidade/i })).toBeInTheDocument();
  });
});
