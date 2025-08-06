import { Shield, Users, Home, Scale } from "lucide-react";

const Rights = () => {
  const rights = [
    {
      icon: Shield,
      title: "Situações Comuns no Dia a Dia",
      description: "Bloqueios bancários indevidos, problemas trabalhistas, questões de consumo e disputas familiares podem ser resolvidos com orientação jurídica adequada.",
      examples: ["Penhora incorreta", "Demissão irregular", "Cobrança abusiva", "Pensão alimentícia"]
    },
    {
      icon: Users,
      title: "Proteção Legal ao Consumidor e Trabalhador",
      description: "Você tem direitos garantidos por lei que devem ser respeitados por empresas e empregadores. Conheça e exerça seus direitos.",
      examples: ["CDC - Código de Defesa", "CLT - Direitos Trabalhistas", "Assédio no trabalho", "Produtos defeituosos"]
    },
    {
      icon: Home,
      title: "Medidas Legais em Casos Familiares",
      description: "Questões familiares delicadas requerem tratamento especializado, sempre priorizando o bem-estar de todos os envolvidos, especialmente crianças.",
      examples: ["Guarda compartilhada", "Pensão alimentícia", "BPC para autistas", "União estável"]
    },
    {
      icon: Scale,
      title: "A Importância da Assessoria Jurídica",
      description: "Ter um advogado de confiança é fundamental para proteger seus interesses e garantir que seus direitos sejam respeitados em todas as situações.",
      examples: ["Análise preventiva", "Orientação especializada", "Defesa estratégica", "Acompanhamento contínuo"]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Entenda Seus <span className="text-primary">Direitos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conhecimento é poder. Saiba como proteger seus direitos e quando 
            buscar orientação jurídica especializada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {rights.map((right, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <right.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-card-foreground leading-tight">
                    {right.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {right.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-card-foreground">
                      Exemplos de situações:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {right.examples.map((example, exampleIndex) => (
                        <div
                          key={exampleIndex}
                          className="flex items-center space-x-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12 border border-primary/20">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Seus Direitos Precisam de Proteção
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Não espere que um problema se agrave. A orientação jurídica preventiva 
                pode evitar complicações futuras e proteger seus interesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Consulte Seus Direitos
              </button>
              <button 
                onClick={() => window.open("https://chatvolt.ai/@assistentelodi", "_blank")}
                className="bg-success text-success-foreground hover:bg-success/90 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Orientação Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rights;