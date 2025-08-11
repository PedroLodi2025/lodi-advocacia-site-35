import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    console.log("Botão 'Fale com um Advogado' clicado");
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      console.log("Navegando para seção de contato");
    } else {
      console.error("Elemento #contact não encontrado");
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(45_95%_60%_/_0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Atuação Jurídica</span>
                <br />
                <span className="text-primary">Especializada</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                nas Áreas de <span className="text-primary font-semibold">Direito Bancário</span>, 
                <span className="text-primary font-semibold"> Direito do Trabalho</span>, 
                <span className="text-primary font-semibold"> Direito de Família</span> e 
                <span className="text-primary font-semibold"> Direito do Consumidor</span>
              </p>
            </div>
            
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                O escritório Lodi Advocacia atua com responsabilidade e conhecimento técnico em casos 
                envolvendo bloqueios bancários, relações de trabalho, proteção familiar e defesa do consumidor.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10">
              <Button 
                size="lg" 
                className="text-base font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-lg border-none relative z-20"
                onClick={scrollToContact}
                type="button"
                style={{ pointerEvents: 'auto' }}
              >
                🔴 Fale com um Advogado
              </Button>
              <Button 
                size="lg" 
                className="text-base font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-lg border-none relative z-20"
                onClick={() => {
                  console.log("Botão Atendimento Online clicado");
                  window.open("https://chatvolt.ai/@assistentelodi", "_blank");
                }}
                type="button"
                style={{ pointerEvents: 'auto' }}
              >
                🟢 Atendimento Online
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Casos Atendidos</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">OAB/SP</div>
                <div className="text-sm text-muted-foreground">210.428</div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl p-6 shadow-2xl border border-border">
              <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/qYafoUPdklQ?si=4hhwuMAHU2xtLSIg"
                  title="Vídeo Institucional - Lodi Advocacia"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Conheça o Dr. Pedro Lodi
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vídeo institucional - OAB/SP 210.428
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;