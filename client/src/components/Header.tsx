import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import logoPath from "@assets/Logo PedroLodi 2025 reduzida sem fundo_1754521524712.png";
// Logo will be referenced directly from public folder

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [location, setLocation] = useLocation();

  const services = [
    { name: "Direito Bancário", url: "https://bancos.lodiadvocacia.com.br" },
    { name: "Direito do Trabalho", url: "https://trabalhista.lodiadvocacia.com.br" },
    { name: "Direito de Família", url: "https://familia.lodiadvocacia.com.br" },
    { name: "Direito do Consumidor", url: "https://consumidor.lodiadvocacia.com.br" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLoginRedirect = () => {
    setLocation('/auth');
  };

  const handleAdminRedirect = () => {
    if (user) {
      setLocation('/admin');
    } else {
      setLocation('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoPath} 
              alt="Lodi Advocacia" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Dr. Pedro H.M. Lodi</h1>
              <p className="text-xs text-muted-foreground">OAB/SP 210.428</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Sobre
            </button>
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                <span>Serviços</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div 
                className={`absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-[60] transition-all duration-200 ${
                  isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(service.url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </div>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Admin Access Button */}
          <div className="flex items-center">
            {user ? (
              <div className="hidden lg:flex items-center space-x-2 mr-4">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleAdminRedirect}>
                  Painel Admin
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sair
                </Button>
              </div>
            ) : null}
            
            {/* Settings Gear Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAdminRedirect}
              className="p-2 hover:bg-accent"
              title="Acesso Administrativo"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-2 p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <div className="px-4">
                <p className="text-sm font-medium text-foreground mb-2">Serviços:</p>
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </a>
                ))}
              </div>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Contato
              </button>
              <div className="px-4 pt-4">
                <div className="w-full">
                  {user ? (
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground block">
                        {user.email}
                      </span>
                      <Button variant="outline" size="sm" onClick={handleAdminRedirect} className="w-full">
                        Painel Admin
                      </Button>
                      <Button variant="outline" size="sm" onClick={signOut} className="w-full">
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={handleLoginRedirect}
                    >
                      <User className="h-4 w-4" />
                      <span>Admin</span>
                    </Button>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;