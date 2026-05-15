import { useParams } from 'react-router-dom';
import { resourcesContent } from '../../content/resources/resources';
import { Badge } from '../../design-system/components/Badge';
import { Card } from '../../design-system/components/Card';
import { Page } from '../../design-system/components/Page';

export function ResourceDetailScreen() {
  const { resourceId } = useParams();
  const resource = resourcesContent.resources.find((item) => item.id === resourceId) ?? resourcesContent.resources[0];

  return (
    <Page width="narrow">
      <Card className="p-6 flex flex-col gap-stack-sm">
        <Badge tone="secondary">{resource.source}</Badge>
        <h1 className="font-headline-lg text-on-surface">{resource.title}</h1>
        <p className="font-body-lg text-on-surface-variant">{resource.description}</p>
        <p className="font-body-md text-on-surface-variant">
          Este detalhe ainda e uma superficie inicial. A curadoria completa do recurso pertence ao front de Biblioteca de Educacao.
        </p>
      </Card>
    </Page>
  );
}

