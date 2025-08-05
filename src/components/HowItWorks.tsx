import { MessageCircle, FileText, Search, FileCheck, Gavel } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Contato pelo Site ou WhatsApp",
      description: "Entre em contato conosco através do formulário do site, WhatsApp ou atendimento online para apresentar seu caso."
    },
    {
      icon: FileText,
      number: "02", 
      title: "Envio de Documentos e Informações",
      description: "Envie todos os documentos relevantes e informações detalhadas sobre sua situação jurídica."
    },
    {
      icon: Search,
      number: "03",
      title: "Análise Técnica Inicial",
      description: "Nossa equipe realiza uma análise minuciosa do seu caso, verificando viabilidade e estratégias."
    },
    {
      icon: FileCheck,
      number: "04",
      title: "Proposta Profissional Personalizada",
      description: "Apresentamos uma proposta detalhada com prazos, custos e estratégia jurídica específica para seu caso."
    },
    {
      icon: Gavel,
      number: "05",
      title: "Início do Acompanhamento Jurídico",
      description: "Com sua aprovação, iniciamos o acompanhamento completo do seu processo com total transparência."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Como Funciona o <span className="text-primary">Atendimento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Um processo simples e transparente para garantir que você receba 
            o melhor atendimento jurídico possível.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 h-0.5 bg-primary transform -translate-y-1/2 transition-all duration-1000" style={{ width: "100%" }} />
            
            <div className="grid grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  {/* Icon container */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-20">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {step.number}
                </div>
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 w-0.5 h-8 bg-border transform -translate-x-1/2" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-xl border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Pronto para Começar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Dê o primeiro passo para resolver sua questão jurídica. 
              Entre em contato agora mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Iniciar Conversa
              </button>
              <button 
                onClick={() => window.open("https://chatvolt.ai/@assistentelodi", "_blank")}
                className="bg-success text-success-foreground hover:bg-success/90 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Chat Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;