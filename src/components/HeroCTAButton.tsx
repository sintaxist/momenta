import { Button } from '@/components/ui/button';

export function HeroCTAButton() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button
      onClick={() => scrollToSection('contacto')}
      size="lg"
      className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-500/25"
      style={{ fontFamily: 'Sora, sans-serif', fontWeight: 500 }}
    >
      Cotizar Mi Evento
    </Button>
  );
}