import { Clock, Info, Map, Phone } from 'lucide-react';
import type { ServiceDirectoryEntry } from '../../domain/services/types';
import { Badge } from './Badge';
import { LinkButton } from './Button';
import { Card } from './Card';

export function ServiceCard({ service }: { service: ServiceDirectoryEntry }) {
  return (
    <Card className="border-l-4 border-l-primary overflow-hidden flex flex-col bg-surface-container-low">
      <article className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Badge tone={service.badgeTone}>{service.type}</Badge>
        </div>
        <h2 className="font-headline-md text-on-surface mb-4">{service.name}</h2>
        <div className="flex flex-col gap-3 font-body-md text-on-surface-variant">
          <div className="flex items-start gap-3">
            <Map className="text-secondary mt-0.5 shrink-0" size={20} />
            <span>{service.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-secondary shrink-0" size={20} />
            <span>{service.phoneDisplay}</span>
          </div>
          {service.hours ? (
            <div className="flex items-center gap-3">
              <Clock className="text-secondary shrink-0" size={20} />
              <span>{service.hours}</span>
            </div>
          ) : null}
          {service.notes ? (
            <div className="flex items-center gap-3">
              <Info className="text-secondary shrink-0" size={20} />
              <span>{service.notes}</span>
            </div>
          ) : null}
        </div>
        <LinkButton href={service.phoneHref} className="mt-6 w-full">
          <Phone size={20} />
          Ligar agora
        </LinkButton>
      </article>
    </Card>
  );
}

