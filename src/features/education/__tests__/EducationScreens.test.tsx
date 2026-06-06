import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { resourcesContent } from '../../../content/resources/resources';
import { EducationLibraryScreen } from '../EducationLibraryScreen';
import { ResourceDetailScreen } from '../ResourceDetailScreen';

beforeEach(() => {
  localStorage.clear();
});

function createDraftState(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: '1.0.0',
    flowPatches: [],
    educationMaterialPatches: [],
    addedFlows: [],
    addedEducationMaterials: [],
    updatedAt: '2026-06-05T00:00:00.000Z',
    ...overrides,
  };
}

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
    expect(screen.getByText('Sobre este material')).toBeInTheDocument();
    expect(screen.getByText('Aplicação prática')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /acessar fonte original/i })).toHaveAttribute(
      'href',
      'https://www.feevale.br/',
    );
  });

  it('shows the preview warning when at least one material was actually added', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          addedEducationMaterials: [
            {
              ...resource,
              id: 'preview-added-material',
              title: 'Material adicionado em teste',
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={['/educacao']}>
        <Routes>
          <Route path="/educacao" element={<EducationLibraryScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/versão de teste/i)).toBeInTheDocument();
    expect(screen.getByText('Material adicionado em teste')).toBeInTheDocument();
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

  it('renders the source badge and dashboard-defined tags without empty badges', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          educationMaterialPatches: [
            {
              id: resource.id,
              sourceIndex: 0,
              patch: {
                tags: ['Respiração', '   ', '', 'Sala de aula'],
              },
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={[`/educacao/${resource.id}`]}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    const detailHeader = screen.getByRole('heading', { name: resource.title }).closest('header');
    const visibleBadgeTexts = Array.from(detailHeader?.querySelectorAll('span') ?? []).map((badge) => badge.textContent);

    expect(visibleBadgeTexts).toEqual([resource.source, 'Respiração', 'Sala de aula']);
    expect(visibleBadgeTexts).not.toContain('Material educativo');
  });

  it('renders YouTube block titles before the iframe and omits the seeded mock description', () => {
    const resource = resourcesContent.resources[0];
    const videoBlock = resource.body?.find((block) => block.kind === 'video' && block.url?.includes('youtube'));

    if (!videoBlock || videoBlock.kind !== 'video' || !videoBlock.title) {
      throw new Error('Expected a seeded YouTube video block with a title.');
    }

    render(
      <MemoryRouter initialEntries={[`/educacao/${resource.id}`]}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    const videoHeading = screen.getByRole('heading', { name: videoBlock.title });
    const iframe = screen.getByTitle(videoBlock.title);

    expect(videoHeading.compareDocumentPosition(iframe) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(screen.queryByText('Embed configurável pelo dashboard.')).not.toBeInTheDocument();
  });

  it('renders a YouTube block title, description, and iframe in DOM order', () => {
    const baseResource = resourcesContent.resources[0];
    const videoTitle = 'Vídeo: pausa guiada de respiração';
    const videoDescription = 'Uma prática breve para acompanhar antes do início da próxima aula.';

    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          addedEducationMaterials: [
            {
              ...baseResource,
              id: 'video-block-with-description',
              title: 'Material com descrição de vídeo',
              body: [
                {
                  id: 'described-video',
                  kind: 'video',
                  title: videoTitle,
                  description: videoDescription,
                  url: 'https://www.youtube.com/watch?v=abcdef12345',
                },
              ],
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={['/educacao/video-block-with-description']}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    const videoHeading = screen.getByRole('heading', { name: videoTitle });
    const description = screen.getByText(videoDescription);
    const iframe = screen.getByTitle(videoTitle);

    expect(videoHeading.compareDocumentPosition(description) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(description.compareDocumentPosition(iframe) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  it('previews local dashboard drafts with a warning banner', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          educationMaterialPatches: [
            {
              id: resource.id,
              sourceIndex: 0,
              patch: {
                title: 'Material em teste',
                body: [{ id: 'draft-body', kind: 'paragraph', title: 'Rascunho', text: 'Texto em revisão.' }],
              },
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={[`/educacao/${resource.id}`]}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Material em teste' })).toBeInTheDocument();
    expect(screen.getByText(/versão de teste/i)).toBeInTheDocument();
    expect(screen.getByText('Texto em revisão.')).toBeInTheDocument();
  });

  it('does not show the preview warning on an unchanged material when another material was added', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          addedEducationMaterials: [
            {
              ...resource,
              id: 'preview-added-material',
              title: 'Material adicionado em teste',
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={[`/educacao/${resource.id}`]}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: resource.title })).toBeInTheDocument();
    expect(screen.queryByText(/versão de teste/i)).not.toBeInTheDocument();
  });

  it('shows the preview warning on a detail page for an added material', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify(
        createDraftState({
          addedEducationMaterials: [
            {
              ...resource,
              id: 'preview-added-material',
              title: 'Material adicionado em teste',
            },
          ],
        }),
      ),
    );

    render(
      <MemoryRouter initialEntries={['/educacao/preview-added-material']}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Material adicionado em teste' })).toBeInTheDocument();
    expect(screen.getByText(/versão de teste/i)).toBeInTheDocument();
  });

  it('renders generic video URLs as full-card links instead of broken embeds', () => {
    const resource = resourcesContent.resources[0];
    localStorage.setItem(
      'secuida:dev-dashboard:drafts:v1',
      JSON.stringify({
        schemaVersion: '1.0.0',
        flowPatches: [],
        educationMaterialPatches: [
          {
            id: resource.id,
            sourceIndex: 0,
            patch: {
              body: [{ id: 'generic-video', kind: 'video', title: 'Vídeo externo', url: 'https://example.com/video' }],
            },
          },
        ],
        addedFlows: [],
        addedEducationMaterials: [],
        updatedAt: '2026-06-05T00:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={[`/educacao/${resource.id}`]}>
        <Routes>
          <Route path="/educacao/:resourceId" element={<ResourceDetailScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /vídeo externo abrir vídeo externo/i })).toHaveAttribute(
      'href',
      'https://example.com/video',
    );
    expect(screen.queryByTitle('Vídeo externo')).not.toBeInTheDocument();
  });
});

it('resolves local dashboard education drafts for preview', async () => {
  const resource = resourcesContent.resources[0];
  localStorage.setItem(
    'secuida:dev-dashboard:drafts:v1',
    JSON.stringify(
      createDraftState({
        educationMaterialPatches: [
          {
            id: resource.id,
            sourceIndex: 0,
            patch: { title: 'Material em teste' },
          },
        ],
      }),
    ),
  );

  const { resolveEducationResourcesForPreview } = await import('../educationResourcePreview');
  const preview = resolveEducationResourcesForPreview();

  expect(preview.isPreviewingDrafts).toBe(true);
  expect(preview.changedResourceIds).toEqual([resource.id]);
  expect(preview.resources[0].title).toBe('Material em teste');
});

it('ignores unchanged education patches when computing preview warning state', async () => {
  const resource = resourcesContent.resources[0];
  localStorage.setItem(
    'secuida:dev-dashboard:drafts:v1',
    JSON.stringify(
      createDraftState({
        educationMaterialPatches: [
          {
            id: resource.id,
            sourceIndex: 0,
            patch: {
              title: resource.title,
              body: resource.body,
            },
          },
        ],
      }),
    ),
  );

  const { resolveEducationResourcesForPreview } = await import('../educationResourcePreview');
  const preview = resolveEducationResourcesForPreview();

  expect(preview.isPreviewingDrafts).toBe(false);
  expect(preview.changedResourceIds).toEqual([]);
  expect(preview.resources).toEqual(resourcesContent.resources);
});

describe('resolveVideoEmbed', () => {
  it('converts YouTube watch URLs to embed URLs', async () => {
    const { resolveVideoEmbed } = await import('../videoEmbeds');

    expect(resolveVideoEmbed('https://www.youtube.com/watch?v=abcdef12345')).toEqual({
      kind: 'youtube',
      embedUrl: 'https://www.youtube.com/embed/abcdef12345',
    });
  });

  it('falls back to a link for generic video URLs', async () => {
    const { resolveVideoEmbed } = await import('../videoEmbeds');

    expect(resolveVideoEmbed('https://example.com/video')).toEqual({
      kind: 'link',
      url: 'https://example.com/video',
    });
  });
});
