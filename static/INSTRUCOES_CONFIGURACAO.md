# 🔥 INSTRUÇÕES COMPLETAS - Firebase + Hostinger

## 📋 PASSO A PASSO COMPLETO

### 1️⃣ CONFIGURAÇÃO DO FIREBASE

#### A. Criar Projeto Firebase
1. Acesse: https://console.firebase.google.com/
2. Clique em **"Criar projeto"**
3. Nome do projeto: `lodi-advocacia` (ou outro nome)
4. **Desabilite** Google Analytics (não é necessário)
5. Clique em **"Criar projeto"**

#### B. Configurar Autenticação
1. No menu lateral: **Authentication**
2. Clique em **"Vamos começar"**
3. Aba **"Sign-in method"**
4. Clique em **"Email/password"**
5. **Habilite** a primeira opção (Email/password)
6. Clique em **"Salvar"**

#### C. Criar Usuário Admin
1. Ainda em Authentication, aba **"Users"**
2. Clique em **"Adicionar usuário"**
3. Email: `pedro.lodi.adv@gmail.com`
4. Senha: `ph230570` (ou outra de sua escolha)
5. Clique em **"Adicionar usuário"**

#### D. Configurar Firestore Database
1. Menu lateral: **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha: **"Iniciar no modo de produção"**
4. Local: **southamerica-east1 (São Paulo)**
5. Clique em **"Concluído"**

#### E. Configurar Regras de Segurança
1. Na aba **"Regras"** do Firestore
2. **SUBSTITUA** todo o conteúdo por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publicar"**

#### F. Obter Configuração do Firebase
1. Clique no ícone de **engrenagem** → **"Configurações do projeto"**
2. Role até **"Seus aplicativos"**
3. Clique em **"</>"** (ícone da web)
4. Apelido do app: `lodi-site`
5. **NÃO** marque Firebase Hosting
6. Clique em **"Registrar app"**
7. **COPIE** toda a configuração que aparece (firebaseConfig)

### 2️⃣ ATUALIZAR ARQUIVOS DO SITE

#### A. Editar firebase-config.js
1. Abra o arquivo `firebase-config.js`
2. **SUBSTITUA** os valores YOUR_XXX pelos valores reais:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "lodi-advocacia.firebaseapp.com", 
    projectId: "lodi-advocacia",
    storageBucket: "lodi-advocacia.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

#### B. Atualizar index.html e admin.html
1. Abra `index.html`
2. Encontre a seção `<script type="module">` no cabeçalho
3. **SUBSTITUA** os valores YOUR_XXX pelos mesmos valores do passo anterior
4. **REPITA** o mesmo processo no arquivo `admin.html`

### 3️⃣ HOSPEDAGEM NA HOSTINGER

#### A. Preparar Arquivos
1. **FAÇA DOWNLOAD** de todos os arquivos da pasta `static/`
2. Certifique-se de ter os seguintes arquivos:
   - `index.html`
   - `admin.html`
   - `styles.css`
   - `firebase-config.js`
   - `auth.js`
   - `articles.js`
   - `admin.js`
   - `main.js`

#### B. Upload para Hostinger
1. Acesse o **cPanel** da Hostinger
2. Abra o **Gerenciador de Arquivos**
3. Navegue até a pasta `public_html`
4. **DELETE** todos os arquivos existentes (se houver)
5. **FAÇA UPLOAD** de todos os arquivos da pasta static
6. Certifique-se de que `index.html` está na raiz do `public_html`

### 4️⃣ TESTE COMPLETO

#### A. Testar Página Principal
1. Acesse seu domínio (ex: `seusite.com`)
2. Verifique se a página carrega corretamente
3. Teste o botão **"Admin"** - deve abrir modal de login

#### B. Testar Login Admin
1. Clique em **"Admin"**
2. Digite: `pedro.lodi.adv@gmail.com`
3. Digite a senha configurada
4. Deve redirecionar para `seusite.com/admin.html`

#### C. Testar Painel Admin
1. Adicione um artigo de teste:
   - Título: "Teste do Sistema"
   - Categoria: "Direito Civil"
   - Descrição: "Este é um teste."
   - URL: `https://google.com`
2. Clique em **"Adicionar Artigo"**
3. Volte para página principal
4. Verifique se o artigo apareceu

---

## 🚨 PROBLEMAS COMUNS

### ❌ "Firebase não foi inicializado"
**Solução:** Verifique se substituiu todos os valores YOUR_XXX em ambos os arquivos HTML.

### ❌ "Erro ao fazer login"
**Solução:** 
1. Verifique se criou o usuário no Firebase Authentication
2. Confirme se as credenciais estão corretas
3. Verifique se o domínio está autorizado no Firebase

### ❌ Artigos não carregam
**Solução:**
1. Verifique as regras do Firestore
2. Confirme se o projeto Firebase está ativo
3. Teste a conexão com internet

### ❌ Página não carrega
**Solução:**
1. Verifique se todos os arquivos estão no `public_html`
2. Confirme se `index.html` está na raiz
3. Limpe o cache do navegador

---

## 🔧 CONFIGURAÇÕES AVANÇADAS

### Autorizar Domínio no Firebase
1. Firebase Console → Authentication
2. Aba **"Settings"** → **"Authorized domains"**
3. Adicione seu domínio: `seudominio.com`

### Backup dos Artigos
Os artigos ficam salvos no Firebase Firestore e são automaticamente backupeados.

### Personalizar Categorias
Para adicionar/alterar categorias, edite os arrays `categories` nos arquivos `admin.js` e `admin.html`.

---

## 📞 SUPORTE

Em caso de dúvidas:
1. Verifique se seguiu todos os passos
2. Teste em uma aba anônima do navegador
3. Verifique o console do navegador (F12 → Console) para erros
4. Confirme se o Firebase está configurado corretamente

---

**✅ CHECKLIST FINAL:**
- [ ] Projeto Firebase criado
- [ ] Authentication habilitado
- [ ] Usuário admin criado
- [ ] Firestore configurado
- [ ] Regras de segurança aplicadas
- [ ] Configuração copiada para arquivos
- [ ] Arquivos enviados para Hostinger
- [ ] Teste de login realizado
- [ ] Teste de artigos realizado

**🎉 SITE PRONTO PARA USO!**