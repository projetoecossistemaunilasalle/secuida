import { useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, Heart, Moon, MoreHorizontal, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/routes';
import { featuredOrientationResource } from '../../content/resources/resources';
import { Badge } from '../../design-system/components/Badge';
import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';

export function OrientationScreen() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="w-full flex-grow flex">
      <AnimatePresence mode="wait">
        {step === 1 && <Step1 key="s1" onNext={() => setStep(2)} />}
        {step === 2 && <StepChat key="s2" onNext={() => setStep(3)} />}
        {step === 3 && <Step2 key="s3" onNext={() => setStep(4)} />}
        {step === 4 && <Step3 key="s4" onNext={() => navigate(routes.contacts)} />}
      </AnimatePresence>
    </div>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState('');

  const options = [
    { id: 'work', label: 'Estresse excessivo no trabalho', Icon: Briefcase },
    { id: 'sleep', label: 'Dificuldade para dormir ou ansiedade', Icon: Moon },
    { id: 'sadness', label: 'Sentimento de desamparo ou tristeza', Icon: Heart },
    { id: 'other', label: 'Outro', Icon: MoreHorizontal },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-grow w-full max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-stack-md md:pt-stack-lg"
    >
      <div className="text-center mb-stack-lg">
        <h1 className="font-display-lg text-on-background mb-stack-sm">Vamos entender o que voce precisa</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Responda sem pressa. Este e um espaco seguro e confidencial pensado para o seu bem-estar.
        </p>
      </div>

      <Card className="p-stack-md mb-stack-md">
        <h2 className="font-headline-md text-on-surface text-center mb-stack-md">O que mais te preocupa hoje?</h2>

        <div className="flex flex-col gap-stack-sm">
          {options.map(({ id, label, Icon }) => (
            <label
              key={id}
              className={`group relative flex items-center p-4 bg-[#EEF8F3] rounded-lg cursor-pointer hover:bg-primary-fixed-dim transition-colors border-l-4 ${
                selected === id ? 'border-primary' : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                className="peer sr-only"
                name="concern"
                value={id}
                onChange={(event) => {
                  setSelected(event.target.value);
                  window.setTimeout(onNext, 400);
                }}
              />
              <div className="absolute inset-0 rounded-lg border-l-4 border-transparent peer-checked:border-primary peer-checked:bg-primary-container/10 transition-all pointer-events-none" />
              <Icon className="text-secondary mr-4 relative z-10" />
              <span className="font-body-lg text-on-surface relative z-10 group-hover:text-on-surface peer-checked:font-bold">{label}</span>
            </label>
          ))}
        </div>
      </Card>
    </motion.main>
  );
}

function StepChat({ onNext }: { onNext: () => void }) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-grow flex flex-col px-container-padding-mobile pb-8 max-w-3xl mx-auto w-full mt-stack-md relative h-full"
    >
      <div className="flex flex-col gap-stack-lg w-full flex-grow">
        <div className="flex items-start gap-gutter w-full">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container shadow-sm border border-outline-variant flex items-center justify-center">
            <BookOpen className="text-primary" size={24} />
          </div>
          <div className="bg-[#EEF8F3] text-on-surface p-4 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(27,58,107,0.05)] border border-outline-variant/30 max-w-[85%]">
            <p className="font-body-lg">Como esta seu nivel de cansaco nos ultimos dias?</p>
          </div>
        </div>

        <div className="flex flex-col gap-stack-sm w-full pl-16">
          {['Estou exausto(a)', 'Cansado(a), mas conseguindo', 'Mais ou menos', 'Me sinto bem'].map((label) => (
            <button
              key={label}
              onClick={onNext}
              className="w-full text-left bg-surface-container-lowest border-2 border-outline-variant rounded-full py-4 px-6 font-body-md text-on-surface hover:bg-surface-container-low hover:border-secondary transition-colors duration-200 shadow-sm active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-stack-lg sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pb-4 z-10 w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Digite ou escolha uma resposta..."
            className="w-full bg-surface-container-lowest border border-secondary/30 rounded-full py-4 pl-6 pr-12 font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_4px_12px_rgba(27,58,107,0.08)]"
          />
          <button
            aria-label="Enviar resposta"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container-low"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </motion.main>
  );
}

function Step2({ onNext }: { onNext: () => void }) {
  const [value, setValue] = useState(7);

  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-grow flex flex-col items-center justify-center px-container-padding-mobile md:px-container-padding-desktop w-full max-w-3xl mx-auto"
    >
      <div className="w-full mb-stack-lg text-center mt-stack-md">
        <p className="font-label-md text-on-surface-variant mb-2">Pergunta 2 de 5</p>
        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '40%' }} />
        </div>
      </div>

      <Card className="w-full p-6 md:p-10">
        <h1 className="font-display-lg text-on-surface mb-stack-lg text-center">Como esta seu nivel de cansaco nos ultimos dias?</h1>

        <div className="w-full mt-stack-md mb-stack-lg px-2">
          <div className="relative w-full h-12 flex items-center">
            <input
              type="range"
              min="0"
              max="10"
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              className="w-full relative z-10"
              id="tiredness-slider"
              aria-label="Nivel de cansaco"
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-primary rounded-l-full z-0 pointer-events-none" style={{ width: `${value * 10}%` }} />
          </div>

          <div className="flex justify-between w-full mt-4">
            <span className="font-label-md text-on-surface-variant">Nenhum</span>
            <span className="font-label-md text-error">Extremo</span>
          </div>
        </div>

        <div className="flex justify-center mt-stack-lg">
          <Button onClick={onNext} size="lg" className="w-full md:w-auto">
            Proximo
            <ArrowRight size={20} />
          </Button>
        </div>
      </Card>
    </motion.main>
  );
}

function Step3({ onNext }: { onNext: () => void }) {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow w-full max-w-7xl mx-auto px-container-padding-mobile py-stack-md flex flex-col gap-stack-lg"
    >
      <section className="flex flex-col gap-stack-sm">
        <h1 className="font-headline-md text-on-surface">Com base no que voce compartilhou, isso pode te ajudar:</h1>
      </section>

      <section className="flex flex-col gap-stack-sm">
        <Card className="p-gutter flex flex-col gap-stack-md">
          <div className="flex flex-col items-start gap-3">
            <Badge tone="secondary">{featuredOrientationResource.source}</Badge>
            <h2 className="font-headline-sm text-on-surface">{featuredOrientationResource.title}</h2>
          </div>
          <p className="font-body-md text-on-surface-variant">{featuredOrientationResource.description}</p>
          <div className="mt-auto pt-2">
            <Button className="w-full">
              <BookOpen size={20} />
              Ver material
            </Button>
          </div>
        </Card>

        <div className="flex justify-center mt-stack-sm">
          <button
            onClick={onNext}
            className="text-primary hover:text-on-primary-fixed-variant font-label-md min-h-[48px] flex items-center justify-center px-4 py-2 rounded-full transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
          >
            Ver outros recursos
          </button>
        </div>
      </section>
    </motion.main>
  );
}

