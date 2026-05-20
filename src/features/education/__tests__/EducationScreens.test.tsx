import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { resourcesContent } from '../../../content/resources/resources';
import { EducationLibraryScreen } from '../EducationLibraryScreen';
import { ResourceDetailScreen } from '../ResourceDetailScreen';

describe('EducationLibraryScreen', () => {
  it('renders configured resources and navigates to the detail route', async () => {
    const user = userEvent.setup();
    const resource = resourcesContent.resources[0];

    render(
      <MemoryRouter initialEntries={['/educacao']}>
        <Routes>
          <Route path="/educacao" element={<EducationLibraryScreen />} />
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(resource.title)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /ver material/i }));

    expect(screen.getByRole('heading', { name: resource.title })).toBeInTheDocument();
  });
});

describe('ResourceDetailScreen', () => {
  it('falls back to the first resource when the id is unknown', () => {
    const resource = resourcesContent.resources[0];

    render(
      <MemoryRouter initialEntries={['/educacao/recurso-inexistente']}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: resource.title })).toBeInTheDocument();
  });
});
