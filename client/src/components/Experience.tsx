import { Heart, BookOpen, Target, Shield } from "lucide-react";

const Experience = () => {
  const highlights = [
    {
      icon: Heart,
      title: "Atendimento Técnico e Humanizado",
      description: "Combinamos excelência jurídica com cuidado pessoal, tratando cada cliente com respeito e dedicação."
    },
    {
      icon: BookOpen,
      title: "Constante Atualização Jurídica",
      description: "Mantemos-nos sempre atualizados com as mudanças legislativas e jurisprudenciais para melhor defendê-lo."
    },
    {
      icon: Target,
      title: "Atuação Multissetorial Estratégica",
      description: "Nossa experiência diversificada permite uma visão ampla e estratégica para resolver seus problemas jurídicos."
    },
    {
      icon: Shield,
      title: "Compromisso com Ética e Clareza",
      description: "Transparência total em todos os processos, mantendo você informado a cada etapa do seu caso."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Experiência <span className="text-primary">Profissional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mais de uma década dedicada à advocacia, com foco na defesa dos direitos fundamentais 
            e na busca pela justiça em cada caso atendido.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <highlight.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground leading-tight">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-card rounded-2xl p-8 lg:p-12 shadow-xl border border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-primary">20+</div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">Anos de Experiência</div>
              <p className="text-sm text-muted-foreground">
                Mais de uma década defendendo os direitos dos cidadãos
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-primary">Inúmeros</div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">Casos Atendidos</div>
              <p className="text-sm text-muted-foreground">
                Centenas de famílias e empresas assistidas com sucesso
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-primary">Alta</div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">Taxa de Sucesso</div>
              <p className="text-sm text-muted-foreground">
                Excelência comprovada na resolução de casos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;