import { AlertCircle, Compass, Leaf, MapPin, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/routes';
import { homeCopy } from '../../content/copy/home';
import { ActionCard } from '../../design-system/components/ActionCard';
import { Card } from '../../design-system/components/Card';
import { Page } from '../../design-system/components/Page';

export function HomeScreen() {
  const navigate = useNavigate();
  const [supportAction, orientationAction, contactsAction] = homeCopy.actions;

  return (
    <Page className="items-center text-center">
      <section className="flex flex-col items-center text-center gap-stack-sm">
        <h1 className="font-display-lg text-on-surface">{homeCopy.title}</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">{homeCopy.subtitle}</p>
        <Card className="p-4 flex items-start gap-4 mt-stack-sm text-left max-w-xl w-full bg-surface-container">
          <Shield className="text-secondary shrink-0 mt-1" size={24} />
          <p className="font-body-md text-on-surface-variant">{homeCopy.privacyReassurance}</p>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-stack-sm max-w-5xl w-full mx-auto">
        <ActionCard
          icon={<AlertCircle className="text-[#F59E0B]" size={22} fill="#F59E0B" color="#fff" />}
          label={supportAction.label}
          description={supportAction.description}
          onClick={() => navigate(routes.support)}
        />
        <ActionCard
          icon={<Compass size={22} />}
          label={orientationAction.label}
          description={orientationAction.description}
          onClick={() => navigate(routes.orientation)}
        />
        <ActionCard
          icon={<MapPin size={22} />}
          label={contactsAction.label}
          description={contactsAction.description}
          onClick={() => navigate(routes.contacts)}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-stack-md max-w-5xl w-full items-center text-left">
        <Card className="p-6 bg-surface-container-low">
          <h2 className="font-headline-sm text-on-surface mb-3">{homeCopy.howItWorksTitle}</h2>
          <ul className="flex flex-col gap-2 font-body-md text-on-surface-variant">
            {homeCopy.howItWorksItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary" aria-hidden="true">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-surface-container to-surface-container-lowest flex items-center justify-center mx-auto opacity-80 pointer-events-none">
          <Leaf className="text-primary-fixed-dim" size={80} />
        </div>
      </section>
    </Page>
  );
}

