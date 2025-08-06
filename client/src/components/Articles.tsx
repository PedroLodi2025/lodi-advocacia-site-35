import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, User } from "lucide-react";

const Articles = () => {
  const articles = [
    {
      title: "Penhora Ilegal de Conta Bancária",
      description: "Saiba como identificar bloqueios indevidos de valores e como agir juridicamente para recuperar seus recursos.",
      buttonText: "Saiba mais",
      url: "https://bancos.lodiadvocacia.com.br",
      category: "Direito Bancário",
      date: "Dezembro 2024"
    },
    {
      title: "Assédio Moral no Ambiente de Trabalho",
      description: "Conheça seus direitos diante de situações abusivas no ambiente profissional e como buscar reparação.",
      buttonText: "Entenda seus direitos",
      url: "https://trabalhista.lodiadvocacia.com.br",
      category: "Direito do Trabalho",
      date: "Novembro 2024"
    },
    {
      title: "BPC Loas para Crianças Autistas",
      description: "Entenda os requisitos e possibilidades legais para acessar o Benefício de Prestação Continuada.",
      buttonText: "Saiba como solicitar",
      url: "https://familia.lodiadvocacia.com.br",
      category: "Direito de Família",
      date: "Outubro 2024"
    },
    {
      title: "Revisão de Contratos de Financiamento",
      description: "Saiba como revisar cláusulas abusivas e buscar equilíbrio contratual em financiamentos bancários.",
      buttonText: "Reveja seu contrato",
      url: "https://consumidor.lodiadvocacia.com.br",
      category: "Direito do Consumidor",
      date: "Setembro 2024"
    }
  ];

  const categoryColors: { [key: string]: string } = {
    "Direito Bancário": "bg-blue-500/10 text-blue-400",
    "Direito do Trabalho": "bg-green-500/10 text-green-400",
    "Direito de Família": "bg-purple-500/10 text-purple-400",
    "Direito do Consumidor": "bg-orange-500/10 text-orange-400"
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Artigos <span className="text-primary">Recentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mantenha-se informado sobre seus direitos com nossos artigos especializados 
            nas principais áreas do direito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Article Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {article.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              {/* Article Footer */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    Dr. Pedro Lodi
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  {article.buttonText}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-xl border border-border">
            <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
              Precisa de Orientação Jurídica?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Não deixe suas dúvidas sem resposta. Entre em contato conosco e receba 
              orientação especializada para seu caso específico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="destructive" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Consulte um Advogado
              </Button>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => window.open("https://chatvolt.ai/@assistentelodi", "_blank")}
              >
                Atendimento Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;