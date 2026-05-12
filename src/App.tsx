/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { 
  Home as HomeIcon, 
  BookOpen, 
  Users, 
  Shield, 
  Circle, 
  Compass, 
  MapPin, 
  Leaf, 
  Heart, 
  BriefcaseMedical, 
  Flame, 
  Phone, 
  Brain, 
  ArrowRight, 
  Send, 
  Map as MapIcon, 
  Clock, 
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

type ScreenId = 'home' | 'emergency' | 'orientation' | 'network' | 'results';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDknMasyrk-yTGOPJjyacDwmXcS2kGhMyQ7PTMSi6gGcoTt4OZgLC_WVYVQpKV0J412sN8tD6JZVXg0KRmcCaxasfER4cMWh9tGphc0_wN21wa2eZjm57jvzaRncnx3HRQWTDt8ctlnpo0xsi9j5D04s8OJfNlW6rTkeVPefYYS-U32bBJ2OXPoXVM_srbJD_KKA1quqOcIMsE6aNRCKcjkSnS8EWNa6Kb-LLXrGpu2dZMX4bKdEt_t7PW5XIq_hpWxCVov3QIlWZg";
const EMERGENCY_ILLUSTRATION = "https://lh3.googleusercontent.com/aida-public/AB6AXuCqkCrY1EdscBmNcq_excVY7DjEwsWfigzGXHMwzoGe0vG9orWO5X2YSkXPstVQ11phTL6lp19Mjtue0ScZkFNfU4lb1iQFipZTUsrMBeCa_XMSUPeegCV6Zgg1BRuEj1HR7M4aTA_-cBB6IVAJiAg4KrOnHt379sOgOf9No7B_FTU7rA9wS7_TDq_7AUR0II2VZp8jFTdQ2uVaAjcD6bOikqQNKWWpzTNF4q06p8W9B4d6lgE0Uiufz8kqX_dj2b8iqW9KWI6mDeQ";
const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-X8WPfKw3DcduVCKfxt4fNgy618L5GV6meuX94stOWppyMNB1ySYGx_0sjoRjf1lsdKYsod6kFjzYZxQdE3VrOukYFWtnnxaDcEZBlbnnnWAdDGbFQ6fW3Q3wQXYjpsyCyoHdskPgwDN33B5DHA-LrjoiTZ1sM7AY-sf-6yW__6zFmiTmlIM6uQQgaUt5DQj3xLWkMeez3cWgCe-ekZFBolC_68cSd0c-_0Re1tei6QIWIlojwTStNtflRRbOktmebcFSSbvPWY";
const RESULTS_ILLUSTRATION = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUu8741_OQaC5gUnsKWur7Ue7XjPl0zrmuOIJ4Beja1qwe3ecefY-jAPirXyxkalCbdbrni9ru9BNvN445eECuIikPSHgiq06Tzqu-95xgP3UoyvMQVVQI36N81_js4EGvH1QQRVXJ_e8rIpiTlui2vOpllyou7wJMei-tkTvrlnzhswzlJVMxW6GA0QKmGziWmfB7sY5Eskwn6YISBEpc1HqIHOmjdvGPEcHf13Ez2CF_WEnk99EtkQo2HAQMRaTBB1WY5bv-ygQ";

// --- Components ---

const ScreenWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-full max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-stack-md pb-32"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [surveyStep, setSurveyStep] = useState(1);
  const [sliderValue, setSliderValue] = useState(7);

  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    // Reset internal states if needed
    if (screen === 'orientation') setSurveyStep(1);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <ScreenWrapper>
            <section className="flex flex-col items-center text-center gap-stack-sm mb-stack-lg">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface leading-tight">
                Como você está hoje?
              </h2>
              <div className="bg-surface-container rounded-xl p-4 flex items-start gap-4 mt-stack-sm text-left max-w-md w-full shadow-soft border border-outline-variant/20">
                <Shield className="text-secondary shrink-0 mt-1" size={24} />
                <p className="font-body text-body-md text-on-surface-variant">
                  Este é um espaço seguro. Tudo o que você compartilha e busca aqui permanece 100% anônimo e confidencial.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-4 max-w-md w-full mx-auto">
              <button 
                onClick={() => navigateTo('emergency')}
                className="w-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low active:scale-[0.98] transition-all duration-200 rounded-full min-h-[64px] px-6 flex items-center justify-start gap-4 shadow-soft group"
                id="btn-not-well"
              >
                <div className="w-4 h-4 rounded-full bg-[#F59E0B] group-hover:scale-110 transition-transform" />
                <span className="font-headline text-lg font-semibold text-on-surface">Não estou bem agora</span>
              </button>

              <button 
                onClick={() => navigateTo('orientation')}
                className="w-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low active:scale-[0.98] transition-all duration-200 rounded-full min-h-[64px] px-6 flex items-center justify-start gap-4 shadow-soft group"
                id="btn-orientation"
              >
                <Compass className="text-secondary group-hover:scale-110 transition-transform" size={24} />
                <span className="font-headline text-lg font-semibold text-on-surface">Preciso de orientação</span>
              </button>

              <button 
                onClick={() => navigateTo('network')}
                className="w-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low active:scale-[0.98] transition-all duration-200 rounded-full min-h-[64px] px-6 flex items-center justify-start gap-4 shadow-soft group"
                id="btn-network"
              >
                <MapPin className="text-secondary group-hover:scale-110 transition-transform" size={24} />
                <span className="font-headline text-lg font-semibold text-on-surface">Ver rede de apoio local</span>
              </button>
            </section>

            <section className="w-full max-w-md mx-auto flex justify-center mt-20 opacity-60 pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-surface-container to-surface-container-lowest flex items-center justify-center">
                <Leaf className="text-primary" size={64} />
              </div>
            </section>
          </ScreenWrapper>
        );

      case 'emergency':
        return (
          <ScreenWrapper>
            <section className="flex flex-col gap-stack-sm text-center items-center mb-stack-lg">
              <div className="w-32 h-32 mb-6 bg-surface-container rounded-full flex items-center justify-center overflow-hidden shadow-soft">
                <img src={EMERGENCY_ILLUSTRATION} alt="Apoio" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-display text-4xl font-bold text-primary mb-2">Você não está sozinho(a).</h1>
              <p className="font-body text-lg text-on-surface-variant max-w-md">
                Se você estiver em sofrimento agora, estas pessoas podem te ajudar.
              </p>
            </section>

            <section className="flex flex-col gap-6">
              {[
                { name: 'CVV', number: '188', desc: 'Centro de Valorização da Vida. Atendimento 24h, gratuito e sigiloso para apoio emocional.', icon: <Heart fill="currentColor" /> },
                { name: 'SAMU', number: '192', desc: 'Serviço de Atendimento Móvel de Urgência. Para emergências médicas que necessitem de intervenção imediata.', icon: <BriefcaseMedical fill="currentColor" /> },
                { name: 'Bombeiros', number: '193', desc: 'Corpo de Bombeiros. Para resgates, tentativas de suicídio ou situações de risco iminente.', icon: <Flame fill="currentColor" /> }
              ].map((contact, i) => (
                <div key={i} className="bg-[#EEF8F3] rounded-2xl p-6 flex flex-col gap-4 shadow-soft border border-outline-variant/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      {contact.icon}
                      <h2 className="font-headline text-xl font-semibold">{contact.name}</h2>
                    </div>
                    <div className="font-display text-4xl font-bold text-on-surface mb-2">{contact.number}</div>
                    <p className="font-body text-on-surface-variant leading-relaxed">
                      {contact.desc}
                    </p>
                  </div>
                  <button className="relative z-10 mt-2 w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-soft">
                    <Phone size={20} />
                    Ligar agora
                  </button>
                </div>
              ))}
            </section>
          </ScreenWrapper>
        );

      case 'orientation':
        if (surveyStep === 1) {
          return (
            <ScreenWrapper>
               <section className="flex flex-col gap-stack-lg w-full flex-grow">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-soft border border-outline-variant">
                    <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-[#EEF8F3] text-on-surface p-5 rounded-2xl rounded-tl-sm shadow-soft border border-outline-variant/30 max-w-[85%]">
                    <p className="font-body text-lg">
                      Como está seu nível de cansaço nos últimos dias?
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full pl-16">
                  {[
                    "Estou exausto(a)",
                    "Cansado(a), mas conseguindo",
                    "Mais ou menos",
                    "Me sinto bem"
                  ].map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => setSurveyStep(2)}
                      className="w-full text-left bg-surface-container-lowest border-2 border-outline-variant rounded-full py-4 px-6 font-body text-on-surface hover:bg-surface-container-low hover:border-secondary transition-all active:scale-[0.98] shadow-soft"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </section>

              <div className="fixed bottom-24 left-0 right-0 px-container-padding-mobile max-w-3xl mx-auto z-10 md:static md:mt-20">
                <div className="relative w-full">
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-6 pr-12 font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-soft" 
                    placeholder="Digite ou escolha uma resposta..." 
                    type="text" 
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-primary transition-colors">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </ScreenWrapper>
          );
        } else {
          return (
            <ScreenWrapper>
              <div className="w-full mb-12 text-center">
                <p className="font-body text-sm font-semibold text-on-surface-variant mb-2">Pergunta 2 de 5</p>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out w-2/5" />
                </div>
              </div>

              <div className="w-full bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-pronounced border border-outline-variant/30">
                <h1 className="font-display text-3xl font-bold text-on-surface mb-12 text-center">
                  Como está seu nível de cansaço nos últimos dias?
                </h1>

                <div className="w-full mb-12 px-2">
                  <div className="relative w-full h-12 flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={sliderValue} 
                      onChange={(e) => setSliderValue(parseInt(e.target.value))}
                      className="z-10"
                    />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-primary rounded-l-full z-0" style={{ width: `${sliderValue * 10}%` }} />
                  </div>
                  <div className="flex justify-between w-full mt-4">
                    <span className="font-body text-sm font-semibold text-on-surface-variant">Nenhum</span>
                    <span className="font-body text-sm font-semibold text-error">Extremo</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => navigateTo('results')}
                    className="bg-primary hover:bg-primary-container text-on-primary font-bold py-4 px-12 rounded-full shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto"
                  >
                    Próximo
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </ScreenWrapper>
          );
        }

      case 'results':
        return (
          <ScreenWrapper>
            <h1 className="font-headline text-2xl font-bold text-on-surface mb-8">
              Com base no que você compartilhou, isso pode te ajudar:
            </h1>

            <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-6 shadow-pronounced border border-outline-variant/30">
              <div className="flex row items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-3">
                  <span className="bg-secondary-container text-on-secondary-container font-semibold text-xs px-2 py-1 rounded-md">FEEVALE</span>
                  <h2 className="font-headline text-xl font-bold text-on-surface leading-snug">
                    Guia Prático de Regulação Emocional em Sala de Aula
                  </h2>
                </div>
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center border border-outline-variant/20">
                  <img src={RESULTS_ILLUSTRATION} alt="Material" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="font-body text-on-surface-variant leading-relaxed">
                Descubra estratégias práticas e acessíveis para lidar com a sobrecarga diária e gerenciar o estresse no ambiente escolar. Este material foi desenvolvido com foco no acolhimento e na preservação da saúde mental do professor.
              </p>

              <button className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-soft mt-2">
                <BookOpen size={20} />
                Ver material
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={() => navigateTo('home')}
                className="text-primary hover:underline font-semibold flex items-center gap-1 p-4"
              >
                Ver outros recursos
              </button>
            </div>
          </ScreenWrapper>
        );

      case 'network':
        return (
          <ScreenWrapper>
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary-container text-on-primary p-2 rounded-full">
                  <MapPin size={24} />
                </div>
                <h1 className="font-headline text-2xl font-bold text-on-surface">Rede de apoio em Canoas</h1>
              </div>
              <p className="font-body text-on-surface-variant">Encontre centros de atendimento e suporte próximos a você.</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { type: 'CAPS', title: 'CAPS II Praça Brasil', addr: 'Av. Getúlio Vargas, 7071 - Centro', tel: '(51) 3236-1500', hrs: '08:00 - 18:00', badge: 'bg-secondary-container text-on-secondary-container' },
                { type: 'UBS', title: 'UBS Centro de Saúde', addr: 'Rua Quinze de Janeiro, 123 - Centro', tel: '(51) 3462-1600', hrs: '07:30 - 17:00', badge: 'bg-outline text-white' },
                { type: 'UNIVERSIDADE', title: 'Clínica Escola Ulbra', addr: 'Av. Farroupilha, 8001 - São José', tel: '(51) 3477-9200', hrs: 'Agendamento prévio', badge: 'bg-outline-variant text-on-surface' }
              ].map((item, i) => (
                <article key={i} className="bg-surface-container-low rounded-2xl border-l-[6px] border-primary shadow-soft p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className={`${item.badge} px-3 py-1 rounded-full text-xs font-bold`}>{item.type}</span>
                  </div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">{item.title}</h2>
                  <div className="flex flex-col gap-3 font-body text-sm text-on-surface-variant">
                    <div className="flex items-start gap-3">
                      <MapIcon className="text-secondary shrink-0" size={18} />
                      <span>{item.addr}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-secondary shrink-0" size={18} />
                      <span>{item.tel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.hrs.includes('Agendamento') ? <Info className="text-secondary shrink-0" size={18} /> : <Clock className="text-secondary shrink-0" size={18} />}
                      <span>{item.hrs}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full h-12 bg-primary text-on-primary font-bold rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft">
                    <Phone size={18} />
                    Ligar agora
                  </button>
                </article>
              ))}
            </div>
          </ScreenWrapper>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-40 w-full border-b border-outline-variant/30 px-container-padding-mobile">
        <div className="flex items-center h-16 w-full max-w-7xl mx-auto justify-between">
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Brain className="text-primary group-hover:rotate-12 transition-transform" size={28} />
            <h1 className="font-headline text-xl md:text-2xl font-bold text-primary">SeCuida</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {[
              { id: 'home', label: 'Home', icon: <HomeIcon size={18} /> },
              { id: 'orientation', label: 'Orientação', icon: <BookOpen size={18} /> },
              { id: 'network', label: 'Rede', icon: <Users size={18} /> }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => navigateTo(nav.id as ScreenId)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  currentScreen === nav.id 
                    ? 'bg-primary-container text-on-primary shadow-soft' 
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {nav.icon}
                {nav.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-t border-outline-variant/30 px-6 py-3 flex justify-around items-center">
        {[
          { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
          { id: 'orientation', label: 'Orientação', icon: <BookOpen size={20} /> },
          { id: 'network', label: 'Rede', icon: <Users size={20} /> }
        ].map((nav) => {
          const isActive = currentScreen === nav.id || (nav.id === 'orientation' && currentScreen === 'results');
          return (
            <button
              key={nav.id}
              onClick={() => navigateTo(nav.id as ScreenId)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100 opacity-60'
              }`}
            >
              <div className={`p-2 rounded-full transition-colors ${
                isActive ? 'bg-primary-container text-on-primary shadow-soft' : ''
              }`}>
                {nav.icon}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}