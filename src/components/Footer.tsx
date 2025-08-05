import { Separator } from "@/components/ui/separator";
import { Scale } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-card-foreground">Lodi Advocacia</h3>
                <p className="text-sm text-muted-foreground">OAB/SP 210.428</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Escritório especializado em Direito Bancário, Direito do Trabalho, 
              Direito de Família e Direito do Consumidor, atuando com ética, 
              responsabilidade e conhecimento técnico.
            </p>
            <p className="text-sm text-primary font-medium">
              "Atuação ética, clara e responsável na defesa dos direitos dos cidadãos."
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">WhatsApp:</p>
                <p className="text-card-foreground font-medium">(19) 99939-1285</p>
              </div>
              <div>
                <p className="text-muted-foreground">E-mail:</p>
                <p className="text-card-foreground font-medium">contato@lodiadvocacia.com.br</p>
              </div>
              <div>
                <p className="text-muted-foreground">Site:</p>
                <p className="text-card-foreground font-medium">www.lodiadvocacia.com.br</p>
              </div>
            </div>
          </div>

          {/* Address & Services */}
          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-4">Endereço</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Escritório:</p>
                <p className="text-card-foreground leading-relaxed">
                  Rua Gal. Luiz F. de Matos, 3338<br />
                  Jardim Roma<br />
                  Pirassununga/SP
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Atendimento:</p>
                <p className="text-card-foreground">
                  Segunda à Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lodi Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Dr. Pedro Henrique M. Lodi</strong> — OAB/SP 210.428
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <a 
              href="#privacy" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href="#terms" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Este site está em conformidade com o Código de Ética e Disciplina da OAB. 
            As informações aqui contidas têm caráter meramente informativo e não constituem consultoria jurídica. 
            Para orientação específica sobre seu caso, consulte diretamente nosso escritório.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;