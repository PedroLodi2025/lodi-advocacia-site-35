# Lodi Advocacia - Legal Website

Um site profissional para o escritório de advocacia Lodi Advocacia, desenvolvido com tecnologias modernas.

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Wouter (routing)
- **Backend**: Express.js + Session-based Authentication
- **Database**: PostgreSQL com Drizzle ORM (atualmente usando storage em memória para desenvolvimento)
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Upload**: Multer para upload de imagens

## 📁 Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Hooks customizados
│   │   └── lib/           # Utilitários
├── server/                 # Backend Express
│   ├── routes.ts          # Rotas da API
│   ├── storage.ts         # Sistema de armazenamento
│   └── index.ts           # Servidor principal
├── shared/                 # Tipos compartilhados
│   └── schema.ts          # Schemas Drizzle + Zod
└── public/                # Arquivos estáticos
    └── uploads/           # Imagens enviadas
```

## 🔧 Funcionalidades

### Site Público
- **Página inicial** com informações do escritório
- **Seções de serviços** com links para sites especializados
- **Área de contato** com informações de contato
- **Design responsivo** com modo escuro/claro
- **Menu de navegação** com submenus hover

### Painel Administrativo
- **Autenticação segura** baseada em sessões
- **Gerenciamento de artigos** (CRUD completo)
- **Upload de imagens** para artigos
- **Categorização** por área do direito
- **Interface intuitiva** com Shadcn/UI

## 🏗️ Arquitetura

### Autenticação
- Sistema baseado em sessões Express
- Middleware de autenticação para rotas protegidas
- Controle de acesso apenas para administradores

### Storage
- Implementação flexível com interface `IStorage`
- Atualmente usando `MemStorage` para desenvolvimento
- Fácil migração para `DatabaseStorage` em produção

### API Endpoints
- `POST /api/auth/signin` - Login de administrador
- `POST /api/auth/signout` - Logout
- `GET /api/auth/me` - Verificação de sessão
- `GET /api/articles` - Listar artigos
- `POST /api/articles` - Criar artigo (com upload)
- `PUT /api/articles/:id` - Atualizar artigo
- `DELETE /api/articles/:id` - Excluir artigo

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Instalação
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Acesse: `http://localhost:5000`

### Acesso Administrativo
- **Email**: pedro.lodi.adv@gmail.com
- **Senha**: ph230570

## 📝 Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run check` - Verificação TypeScript
- `npm run db:push` - Push schema para banco

### Categorias de Artigos
- Direito Civil
- Direito Bancário
- Direito do Trabalho
- Direito de Família
- Direito do Consumidor
- Direito Empresarial

## 🔒 Segurança

- Validação de dados com Zod
- Hash de senhas com bcrypt
- Sanitização de uploads de arquivo
- Sessões seguras com Express Session
- Middleware de autenticação em rotas protegidas

## 🎨 Design

- Design responsivo mobile-first
- Tema escuro/claro automático
- Componentes Shadcn/UI consistentes
- Animações suaves com Framer Motion
- Tipografia profissional

## 📱 Responsividade

- **Desktop**: Layout completo com menu horizontal
- **Mobile**: Menu colapsível com navigation drawer
- **Tablet**: Layout adaptativo
- **Todos os dispositivos**: Touch-friendly interface

## 🚀 Deploy

O projeto está configurado para deploy fácil no Replit:
1. Push para repositório GitHub
2. Deploy automático via Replit Deployments
3. Configurar variáveis de ambiente em produção
4. Migrar para banco PostgreSQL real

## 📞 Contato

**Dr. Pedro H.M. Lodi**
- **OAB/SP**: 210.428
- **Email**: pedro.lodi.adv@gmail.com
- **Áreas de Atuação**: Direito Civil, Bancário, Trabalhista, Família, Consumidor, Empresarial

---

Desenvolvido com ❤️ para Lodi Advocacia