import { Shield } from 'lucide-react';
import { Card } from '../../design-system/components/Card';
import { Page } from '../../design-system/components/Page';
import { PageHeader } from '../../design-system/components/PageHeader';

export function PrivacyScreen() {
  return (
    <Page width="narrow">
      <PageHeader
        title="Privacidade"
        description="O SeCuida deve ser anonimo por padrao e nao deve salvar respostas, historico de conversa ou localizacao sem revisao de privacidade."
        icon={<Shield className="text-primary" size={32} />}
      />

      <Card className="p-6">
        <h2 className="font-headline-sm text-on-surface mb-3">Politica de sessao atual</h2>
        <p className="font-body-md text-on-surface-variant">
          Nesta fase, o app usa apenas estado em memoria para a interacao atual. Nao ha login, identificacao pessoal, analytics ou persistencia de dados sensiveis.
        </p>
      </Card>
    </Page>
  );
}

