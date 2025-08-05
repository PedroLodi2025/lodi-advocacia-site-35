import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
// Logo will be referenced directly from public folder

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper authentication
    if (loginData.username === "admin" && loginData.password === "lodi2025") {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: "", password: "" });
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
            {!isLoggedIn ? (
              !showLogin ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLogin(true)}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </Button>
              ) : (
                <form onSubmit={handleLogin} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Usuário"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-24 h-8 text-xs"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-24 h-8 text-xs"
                    required
                  />
                  <Button type="submit" size="sm" variant="default">
                    Entrar
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowLogin(false)}
                  >
                    Cancelar
                  </Button>
                </form>
              )
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Admin logado</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            )}
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
                {!isLoggedIn ? (
                  !showLogin ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowLogin(true)}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Login Admin</span>
                    </Button>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Usuário"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full"
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Senha"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full"
                        required
                      />
                      <div className="flex space-x-2">
                        <Button type="submit" size="sm" className="flex-1">
                          Entrar
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setShowLogin(false)}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  )
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-center text-muted-foreground">Admin logado</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Sair
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;