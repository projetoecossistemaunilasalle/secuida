import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { OrientationScreen } from '../OrientationScreen';

describe('OrientationScreen', () => {
  it('renders guided orientation without free-text submission', () => {
    render(
      <MemoryRouter>
        <OrientationScreen />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Orientação guiada' })).toBeInTheDocument();
    expect(screen.getByText('Sobrecarga na escola')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filtrar opções disponíveis')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Digite ou escolha uma resposta...')).not.toBeInTheDocument();
  });

  it('advances when the user chooses an available option', () => {
    render(
      <MemoryRouter>
        <OrientationScreen />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Muitas tarefas ao mesmo tempo' }));

    expect(
      screen.getByText('Quando tudo parece urgente, ajuda separar o que precisa de atenção agora do que pode esperar.'),
    ).toBeInTheDocument();
  });

  it('exposes the conversation as an accessible log with sender context', () => {
    render(
      <MemoryRouter>
        <OrientationScreen />
      </MemoryRouter>,
    );

    expect(screen.getByRole('log', { name: 'Histórico da orientação guiada' })).toBeInTheDocument();
    expect(screen.getAllByText('SeCuida')).toHaveLength(2);
  });
});
