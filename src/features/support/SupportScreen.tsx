import { supportContacts } from '../../content/support/contacts';
import { BreathingExercise } from '../../design-system/components/BreathingExercise';
import { Page } from '../../design-system/components/Page';
import { SupportContactCard } from '../../design-system/components/SupportContactCard';

const heroImage = `${import.meta.env.BASE_URL}hands_holding_plant.png`;

export function SupportScreen() {
  return (
    <Page width="narrow" className="pt-stack-md">
      <section className="flex flex-col gap-stack-sm text-center items-center mt-4">
        <div className="w-32 h-32 mb-4 bg-surface-container rounded-full flex items-center justify-center overflow-hidden shadow-sm">
          <img alt="Apoio" className="w-full h-full object-cover" src={heroImage} />
        </div>
        <h1 className="font-display-lg text-primary flex items-center gap-3 justify-center">{supportContacts.title}</h1>
        <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">{supportContacts.description}</p>
      </section>

      <BreathingExercise />

      <section className="flex flex-col gap-stack-md">
        {supportContacts.contacts.map((contact) => (
          <SupportContactCard key={contact.id} contact={contact} />
        ))}
      </section>
    </Page>
  );
}
