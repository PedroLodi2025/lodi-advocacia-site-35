# Lodi Advocacia - Site Estático

Este é o site estático da Lodi Advocacia, adaptado para hospedagem na Hostinger com Firebase para autenticação e banco de dados.

## Estrutura do Projeto

```
static/
├── index.html          # Página principal
├── admin.html          # Painel administrativo
├── styles.css          # Estilos customizados
├── firebase-config.js  # Configuração do Firebase
├── auth.js            # Autenticação
├── articles.js        # Gerenciamento de artigos (página principal)
├── admin.js           # Funcionalidades do painel admin
├── main.js            # Funcionalidades gerais
└── README.md          # Este arquivo
```

## Configuração do Firebase

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar projeto"
3. Nomeie o projeto (ex: "lodi-advocacia")
4. Complete a configuração

### 2. Configurar Authentication

1. No console Firebase, vá em **Authentication**
2. Clique na aba **Sign-in method**
3. Habilite **Email/Password**
4. Na aba **Users**, adicione um usuário administrativo:
   - Email: pedro.lodi.adv@gmail.com
   - Senha: [sua senha escolhida]

### 3. Configurar Firestore Database

1. Vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Iniciar no modo de produção**
4. Selecione uma localização próxima (southamerica-east1)

### 4. Configurar Regras de Segurança

Na aba **Regras** do Firestore, substitua pelas seguintes regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Artigos: leitura pública, escrita apenas para usuários autenticados
    match /articles/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Obter Configuração do Projeto

1. Vá em **Configurações do projeto** (ícone de engrenagem)
2. Na aba **Geral**, role até **Seus aplicativos**
3. Clique em **Adicionar app** → **Web**
4. Registre o app com um nome
5. Copie a configuração fornecida

### 6. Atualizar firebase-config.js

Substitua os valores em `firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-project-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "seu-sender-id",
    appId: "seu-app-id"
};
```

## Hospedagem na Hostinger

### 1. Preparar Arquivos

- Faça upload de todos os arquivos da pasta `static/` para o diretório `public_html` da Hostinger
- Certifique-se de que `index.html` está no diretório raiz

### 2. Configurar Domínio

- O site será acessível através do seu domínio principal
- O painel admin estará em `seudominio.com/admin.html`

### 3. Testar Funcionalidades

1. **Página Principal**: Verifique se carrega corretamente
2. **Login Admin**: Teste o login com as credenciais configuradas
3. **Artigos**: Teste adicionar, editar e excluir artigos
4. **Responsividade**: Verifique em dispositivos móveis

## Funcionalidades

### Página Principal (index.html)
- Hero section com informações da advocacia
- Seção de experiência com estatísticas
- Artigos recentes carregados do Firebase
- Áreas de atuação
- Informações de contato
- Modal de login administrativo

### Painel Administrativo (admin.html)
- Login obrigatório via Firebase Auth
- Adicionar novos artigos (máximo 4)
- Editar artigos existentes
- Excluir artigos
- Limite de 20 linhas por descrição
- Suporte a URLs de imagens externas

### Artigos
- Máximo de 4 artigos simultâneos
- Novos artigos substituem os mais antigos automaticamente
- Categorias pré-definidas
- Suporte a imagens via URL
- URLs opcionais para "Saiba mais"

## Categorias Disponíveis

- Direito Civil
- Direito Bancário
- Direito do Trabalho
- Direito de Família
- Direito do Consumidor
- Direito Empresarial

## Segurança

- Autenticação obrigatória para acesso administrativo
- Regras de Firestore restringem escrita apenas para usuários autenticados
- Validação de dados no frontend
- Sanitização de URLs

## Suporte

Para dúvidas ou problemas:
1. Verifique se o Firebase foi configurado corretamente
2. Confirme se as regras do Firestore estão aplicadas
3. Teste a conectividade com a internet
4. Verifique o console do navegador para erros

## Atualizações

Para atualizar o site:
1. Modifique os arquivos necessários
2. Faça upload dos arquivos alterados via FTP/cPanel da Hostinger
3. Limpe o cache do navegador se necessário

---

**Desenvolvido para Lodi Advocacia**
*Site estático otimizado para Hostinger com Firebase*