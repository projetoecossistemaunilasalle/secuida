import { supportContacts } from '../../content/support/contacts';
import { Page } from '../../design-system/components/Page';
import { PageHeader } from '../../design-system/components/PageHeader';
import { SupportContactCard } from '../../design-system/components/SupportContactCard';

export function SupportScreen() {
  return (
    <Page width="narrow" className="pt-stack-md">
      <PageHeader title={supportContacts.title} description={supportContacts.description} align="center" />

      <section className="flex flex-col gap-stack-md">
        {supportContacts.contacts.map((contact) => (
          <SupportContactCard key={contact.id} contact={contact} />
        ))}
      </section>

      <section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/40">
        <h2 className="font-headline-sm text-on-surface mb-2">Respire por um momento</h2>
        <p className="font-body-md text-on-surface-variant">
          Inspire contando ate quatro, segure por dois, solte o ar contando ate seis. Repita algumas vezes se isso for confortavel para voce.
        </p>
      </section>
    </Page>
  );
}

