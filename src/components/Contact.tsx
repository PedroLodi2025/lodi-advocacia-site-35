import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xdkdkevp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Entraremos em contato em breve.",
        });
        form.reset();
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Entre em <span className="text-primary">Contato</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pronto para resolver sua questão jurídica? Entre em contato conosco 
            e receba orientação especializada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground">(19) 99939-1285</p>
                    <p className="text-sm text-muted-foreground">Atendimento rápido e direto</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">E-mail</h4>
                    <p className="text-muted-foreground">contato@lodiadvocacia.com.br</p>
                    <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Endereço</h4>
                    <p className="text-muted-foreground">
                      Rua Gal. Luiz F. de Matos, 3338<br />
                      Jardim Roma - Pirassununga/SP
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Horário de Atendimento</h4>
                    <p className="text-muted-foreground">
                      Segunda à Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-4">
              <Button 
                variant="success" 
                size="lg" 
                className="w-full text-base"
                onClick={() => window.open("https://chatvolt.ai/@assistentelodi", "_blank")}
              >
                🟢 Atendimento Online Imediato
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full text-base"
                onClick={() => window.open("https://wa.me/5519999391285", "_blank")}
              >
                📱 WhatsApp: (19) 99939-1285
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Envie sua Mensagem
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground">
                  Mensagem Enviada!
                </h4>
                <p className="text-muted-foreground">
                  Recebemos sua mensagem e entraremos em contato em breve.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Enviar Nova Mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-card-foreground mb-2">
                    WhatsApp
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva sua situação jurídica com detalhes..."
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="destructive" 
                  size="lg" 
                  className="w-full text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao enviar esta mensagem, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;