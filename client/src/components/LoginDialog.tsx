import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Eye, EyeOff } from "lucide-react";

interface LoginDialogProps {
  onLogin?: (userData: { username: string; password: string }) => void;
  onRegister?: (userData: { username: string; email: string; password: string; confirmPassword: string }) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  adminName?: string;
}

const LoginDialog = ({ onLogin, onRegister, isLoggedIn, onLogout, adminName }: LoginDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(loginData);
    }
    setIsOpen(false);
    setLoginData({ username: "", password: "" });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (onRegister) {
      onRegister(registerData);
    }
    setIsOpen(false);
    setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setLoginData({ username: "", password: "" });
    setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setMode('login');
    setLoginData({ username: "", password: "" });
    setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          {adminName ? `${adminName}` : 'Admin logado'}
        </span>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>Admin</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === 'login' ? 'Login de Administrador' : 'Cadastro de Administrador'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Nome de usuário</Label>
                <Input
                  id="login-username"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleDialogClose}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Nome de usuário</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Escolha um nome de usuário"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">E-mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite uma senha"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button type="submit" className="w-full">
                  Cadastrar
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleDialogClose}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
          
          <div className="text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={switchMode}
              className="text-sm"
            >
              {mode === 'login' 
                ? 'Não tem conta? Cadastre-se aqui' 
                : 'Já tem conta? Faça login aqui'
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;