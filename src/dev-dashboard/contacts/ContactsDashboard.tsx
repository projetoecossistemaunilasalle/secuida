import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { ServiceDirectoryEntry } from '../../domain/services/types';
import { Button } from '../../design-system/components/Button';
import { ConfirmButton } from '../components/ConfirmButton';
import { Field } from '../components/Field';
import { inputClass, inputInvalidClass, textareaClass } from '../components/fieldStyles';
import { ValidationSummary } from '../components/ValidationSummary';
import { fieldHasError, issuesForPath, type FieldIssues } from '../validation/fieldIssues';
import type { DashboardValidationResult } from '../validation/validationTypes';
import { badgeToneForServiceType, normalizePhoneHref } from './contactDrafts';

const serviceTypeSuggestions = ['CAPS', 'UBS', 'CRAS', 'CREAS', 'Universidade', 'Outro'];

export function ContactsDashboard({
  services,
  validation,
  onServiceChange,
  onServiceAdd,
  onServiceRemove,
}: {
  services: ServiceDirectoryEntry[];
  validation: DashboardValidationResult;
  onServiceChange: (index: number, id: string, patch: Partial<ServiceDirectoryEntry>) => void;
  onServiceAdd: () => string;
  onServiceRemove: (index: number, id: string) => void;
}) {
  const fieldId = useId();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(() => services[0]?.id ?? null);
  const selectedIndex = services.findIndex(({ id }) => id === selectedServiceId);
  const effectiveIndex = selectedIndex >= 0 ? selectedIndex : services.length > 0 ? 0 : -1;
  const selectedService = effectiveIndex >= 0 ? services[effectiveIndex] : undefined;

  function addService() {
    setSelectedServiceId(onServiceAdd());
  }

  function changeService(patch: Partial<ServiceDirectoryEntry>) {
    if (!selectedService) return;
    onServiceChange(effectiveIndex, selectedService.id, patch);
  }

  function removeService() {
    if (!selectedService) return;
    const neighbor = services[effectiveIndex + 1] ?? services[effectiveIndex - 1];
    setSelectedServiceId(neighbor?.id ?? null);
    onServiceRemove(effectiveIndex, selectedService.id);
  }

  return (
    <section className="flex flex-col gap-stack-md">
      <header className="flex flex-col gap-1">
        <h2 className="font-headline-md text-on-surface">Contatos</h2>
        <p className="font-body-md text-on-surface-variant">Edite os serviços que aparecem na rede de apoio.</p>
      </header>

      <div className="grid gap-stack-md lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex flex-col gap-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-4">
          <Button type="button" className="w-full" onClick={addService}>
            <Plus aria-hidden="true" className="h-5 w-5" />
            Novo contato
          </Button>

          {services.length === 0 ? (
            <p className="rounded-lg bg-surface-container-low p-3 font-body-md text-on-surface-variant">
              Nenhum contato cadastrado ainda.
            </p>
          ) : null}

          <ul aria-label="Contatos disponíveis" className="flex flex-col gap-2">
            {services.map((service, serviceIndex) => {
              const isSelected = serviceIndex === effectiveIndex;

              return (
                <li key={`${service.id}-${serviceIndex}`}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`flex min-h-11 w-full flex-col justify-center rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="font-label-md">{service.name || 'Contato sem nome'}</span>
                    <span className={`font-label-sm ${isSelected ? 'text-on-primary/85' : 'text-on-surface-variant'}`}>
                      {service.type || 'Sem tipo'} · {service.city || 'Sem cidade'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {selectedService ? (
          <section className="flex flex-col gap-stack-sm rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-headline-sm text-on-surface">Editar {selectedService.name || 'contato sem nome'}</h3>
              <ConfirmButton
                key={selectedService.id}
                prompt="Remover contato"
                onConfirm={removeService}
                aria-label={`Remover contato ${selectedService.name || 'sem nome'}`}
              />
            </div>

            <ContactFields
              fieldId={fieldId}
              service={selectedService}
              serviceIndex={effectiveIndex}
              validation={validation}
              onChange={changeService}
            />
          </section>
        ) : null}
      </div>

      <ValidationSummary result={validation} />
    </section>
  );
}

function ContactFields({
  fieldId,
  service,
  serviceIndex,
  validation,
  onChange,
}: {
  fieldId: string;
  service: ServiceDirectoryEntry;
  serviceIndex: number;
  validation: DashboardValidationResult;
  onChange: (patch: Partial<ServiceDirectoryEntry>) => void;
}) {
  const path = `contacts.${serviceIndex}`;
  const nameIssues = issuesForPath(validation, `${path}.name`);
  const typeIssues = issuesForPath(validation, `${path}.type`);
  const cityIssues = issuesForPath(validation, `${path}.city`);
  const stateIssues = issuesForPath(validation, `${path}.state`);
  const addressIssues = issuesForPath(validation, `${path}.address`);
  const phoneIssues = mergeFieldIssues(
    issuesForPath(validation, `${path}.phoneDisplay`),
    issuesForPath(validation, `${path}.phoneHref`),
  );
  const hoursIssues = issuesForPath(validation, `${path}.hours`);
  const notesIssues = issuesForPath(validation, `${path}.notes`);

  return (
    <div className="flex flex-col gap-4">
      <Field label="Nome" htmlFor={`${fieldId}-name`} hint="Nome exibido na rede de apoio." issues={nameIssues}>
        <input
          id={`${fieldId}-name`}
          className={fieldClass(nameIssues)}
          value={service.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </Field>

      <Field
        label="Tipo de serviço"
        htmlFor={`${fieldId}-type`}
        hint="Digite livremente ou escolha uma sugestão."
        issues={typeIssues}
      >
        <input
          id={`${fieldId}-type`}
          list="contact-service-type-suggestions"
          className={fieldClass(typeIssues)}
          value={service.type}
          onChange={(event) => {
            const type = event.target.value;
            onChange({ type, badgeTone: badgeToneForServiceType(type) });
          }}
        />
      </Field>
      <datalist id="contact-service-type-suggestions">
        {serviceTypeSuggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_96px]">
        <Field
          label="Cidade"
          htmlFor={`${fieldId}-city`}
          hint="Município onde o atendimento é oferecido."
          issues={cityIssues}
        >
          <input
            id={`${fieldId}-city`}
            className={fieldClass(cityIssues)}
            value={service.city}
            onChange={(event) => onChange({ city: event.target.value })}
          />
        </Field>
        <Field label="Estado" htmlFor={`${fieldId}-state`} hint="Use a sigla com duas letras." issues={stateIssues}>
          <input
            id={`${fieldId}-state`}
            maxLength={2}
            className={fieldClass(stateIssues)}
            value={service.state}
            onChange={(event) => onChange({ state: event.target.value.toLocaleUpperCase('pt-BR').slice(0, 2) })}
          />
        </Field>
      </div>

      <Field
        label="Endereço"
        htmlFor={`${fieldId}-address`}
        hint="Local exibido para quem busca atendimento."
        issues={addressIssues}
      >
        <input
          id={`${fieldId}-address`}
          className={fieldClass(addressIssues)}
          value={service.address}
          onChange={(event) => onChange({ address: event.target.value })}
        />
      </Field>

      <Field
        label="Telefone"
        htmlFor={`${fieldId}-phone`}
        hint="A formatação digitada será mantida."
        issues={phoneIssues}
      >
        <input
          id={`${fieldId}-phone`}
          inputMode="tel"
          className={fieldClass(phoneIssues)}
          value={service.phoneDisplay}
          onChange={(event) => {
            const phoneDisplay = event.target.value;
            onChange({ phoneDisplay, phoneHref: normalizePhoneHref(phoneDisplay) });
          }}
        />
      </Field>

      <Field label="Horário de atendimento (opcional)" htmlFor={`${fieldId}-hours`} issues={hoursIssues}>
        <input
          id={`${fieldId}-hours`}
          className={fieldClass(hoursIssues)}
          value={service.hours ?? ''}
          onChange={(event) => onChange({ hours: event.target.value })}
        />
      </Field>

      <Field label="Observações (opcional)" htmlFor={`${fieldId}-notes`} issues={notesIssues}>
        <textarea
          id={`${fieldId}-notes`}
          className={fieldClass(notesIssues, textareaClass)}
          value={service.notes ?? ''}
          onChange={(event) => onChange({ notes: event.target.value })}
        />
      </Field>
    </div>
  );
}

function fieldClass(issues: FieldIssues, base = inputClass) {
  return fieldHasError(issues) ? `${base} ${inputInvalidClass}` : base;
}

function mergeFieldIssues(...issueGroups: FieldIssues[]): FieldIssues {
  return {
    errors: issueGroups.flatMap(({ errors }) => errors),
    warnings: issueGroups.flatMap(({ warnings }) => warnings),
  };
}
