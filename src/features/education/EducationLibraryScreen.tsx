import { BookOpen } from 'lucide-react';
import { resourcesContent } from '../../content/resources/resources';
import { Badge } from '../../design-system/components/Badge';
import { Card } from '../../design-system/components/Card';
import { Page } from '../../design-system/components/Page';
import { PageHeader } from '../../design-system/components/PageHeader';

export function EducationLibraryScreen() {
  return (
    <Page>
      <PageHeader
        title="Biblioteca de educacao"
        description="Recursos revisaveis para apoiar professores com informacao clara, pratica e nao diagnostica."
        icon={<BookOpen className="text-primary" size={32} />}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        {resourcesContent.resources.map((resource) => (
          <Card key={resource.id} className="p-6 flex flex-col gap-stack-sm">
            <div className="flex items-center gap-2">
              <Badge tone="secondary">{resource.source}</Badge>
            </div>
            <h2 className="font-headline-sm text-on-surface">{resource.title}</h2>
            <p className="font-body-md text-on-surface-variant">{resource.description}</p>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="font-label-md text-secondary bg-surface-container-low px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </section>
    </Page>
  );
}

