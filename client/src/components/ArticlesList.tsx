import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { ChevronRight } from 'lucide-react';
import type { Article } from '@shared/schema';



const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryColors: Record<string, string> = {
    'Direito Civil': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Direito Bancário': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Direito do Trabalho': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Direito de Família': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Direito do Consumidor': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Direito Empresarial': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const articles = await apiRequest('/api/articles?limit=6');
      setArticles(articles);
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (article: Article) => {
    if (article.url) {
      window.open(article.url, '_blank');
    } else {
      // Scroll to contact section if no URL provided
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Artigos Recentes</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fique por dentro das últimas novidades e decisões do mundo jurídico
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-lg border border-border animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background" id="articles">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Artigos Recentes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique por dentro das últimas novidades e decisões do mundo jurídico
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Nenhum artigo publicado ainda. Em breve teremos novos conteúdos!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <div key={article.id} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 group">
                {article.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${categoryColors[article.category] || 'bg-gray-100 text-gray-800'} border-0`}>
                      {article.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(article.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleButtonClick(article)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    variant="outline"
                  >
                    {article.button_text}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Precisa de orientação jurídica especializada?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para analisar seu caso e oferecer as melhores soluções jurídicas. 
            Entre em contato conosco para uma consulta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#ab1c09e6] text-[#f2f4f7] hover:bg-primary/90 shadow-lg hover:shadow-xl"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Consultar Advogado
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
              onClick={() => window.open('https://chatvolt.ai/@assistentelodi', '_blank')}
            >
              Assistência Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesList;