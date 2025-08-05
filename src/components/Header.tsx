import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import LoginDialog from "./LoginDialog";
// Logo will be referenced directly from public folder

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");

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

  const handleLogin = (userData: { username: string; password: string }) => {
    // Simple authentication - in production, use proper authentication
    if (userData.username === "admin" && userData.password === "lodi2025") {
      setIsLoggedIn(true);
      setCurrentUser(userData.username);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const handleRegister = (userData: { username: string; email: string; password: string; confirmPassword: string }) => {
    // Simulate registration - in production, use proper backend
    console.log("Registrando usuário:", userData);
    alert(`Usuário ${userData.username} registrado com sucesso! (Simulação)`);
    setIsLoggedIn(true);
    setCurrentUser(userData.username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lodi-logo-transparent.png" 
              alt="Lodi Advocacia" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Pedro H.M. Lodi</h1>
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
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-[60]">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(service.url, '_blank');
                        setIsServicesOpen(false);
                      }}
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Admin Login */}
          <div className="hidden lg:flex items-center space-x-4">
            <LoginDialog
              onLogin={handleLogin}
              onRegister={handleRegister}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              adminName={currentUser}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
                  <LoginDialog
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                    adminName={currentUser}
                  />
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