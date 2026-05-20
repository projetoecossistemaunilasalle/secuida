import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heart } from 'lucide-react';
import type { ServiceDirectoryEntry } from '../../../domain/services/types';
import type { SupportContact } from '../../../domain/support/types';
import { ActionCard } from '../ActionCard';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { ServiceCard } from '../ServiceCard';
import { SupportContactCard } from '../SupportContactCard';

const service = {
  id: 'service-test',
  name: 'Serviço de Teste',
  type: 'Atenção psicossocial',
  badgeTone: 'primary',
  city: 'Canoas',
  state: 'RS',
  address: 'Rua de Teste, 123',
  phoneDisplay: '(51) 99999-9999',
  phoneHref: 'tel:51999999999',
  review: {
    status: 'pending_review',
    reviewedBy: null,
    reviewedAt: null,
    notes: '',
  },
} satisfies ServiceDirectoryEntry;

const contact = {
  id: 'contact-test',
  name: 'Contato de Teste',
  phoneDisplay: '188',
  phoneHref: 'tel:188',
  description: 'Descrição do contato.',
  review: {
    status: 'pending_review',
    reviewedBy: null,
    reviewedAt: null,
    notes: '',
  },
} satisfies SupportContact;

describe('design-system components', () => {
  it('renders core layout and command primitives', () => {
    render(
      <Page>
        <PageHeader title="Título da página" description="Descrição da página" />
        <Card>Conteúdo do card</Card>
        <Badge>Rótulo</Badge>
        <Button>Continuar</Button>
        <ActionCard
          icon={<Heart aria-hidden="true" size={20} />}
          label="Ação principal"
          description="Descrição da ação"
          onClick={() => undefined}
        />
      </Page>,
    );

    expect(screen.getByRole('heading', { name: /título da página/i })).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
    expect(screen.getByText('Rótulo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ação principal/i })).toBeInTheDocument();
  });

  it('renders service and support contact cards with actionable phone links', () => {
    render(
      <>
        <ServiceCard service={service} />
        <SupportContactCard contact={contact} />
      </>,
    );

    expect(screen.getByText(service.name)).toBeInTheDocument();
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getAllByRole('link').some((link) => link.getAttribute('href')?.startsWith('tel:'))).toBe(true);
  });
});
