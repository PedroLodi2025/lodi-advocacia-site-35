# Instruções de Configuração - Lodi Advocacia

## ✅ Passos Concluídos

### 1. Arquivos Criados
- ✅ `index.html` - Página principal
- ✅ `admin.html` - Painel administrativo
- ✅ `styles.css` - Estilos personalizados
- ✅ `firebase-config.js` - Configuração do Firebase (valores reais aplicados)
- ✅ `auth.js` - Sistema de autenticação
- ✅ `articles.js` - Gerenciamento de artigos
- ✅ `admin.js` - Funcionalidades administrativas
- ✅ `main.js` - Funcionalidades gerais

### 2. Configuração Firebase
- ✅ Valores reais aplicados:
  - Project ID: `lodiadvocacia-79fd5`
  - Auth Domain: `lodiadvocacia-79fd5.firebaseapp.com`
  - API Key: Configurada
  - App ID: Configurado

## 📋 Próximos Passos (Manual)

### 3. Configurar Firebase Authentication
1. Acesse [Firebase Console](https://console.firebase.google.com/project/lodiadvocacia-79fd5)
2. Vá em **Authentication** → **Sign-in method**
3. Habilite **Email/Password**
4. Em **Users**, adicione:
   - Email: `pedro.lodi.adv@gmail.com`
   - Senha: `ph230570` (ou sua preferência)

### 4. Configurar Firestore Database
1. Vá em **Firestore Database** → **Create database**
2. Escolha **Start in production mode**
3. Selecione localização: `southamerica-east1`
4. Configure as regras de segurança:

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

### 5. Upload para Hostinger
1. Faça upload de todos os arquivos da pasta `static/` para `public_html`
2. Certifique-se que `index.html` está no diretório raiz

## 🎯 Funcionalidades Implementadas

### Página Principal (`index.html`)
- Hero section com informações da advocacia
- Estatísticas (20+ anos, inúmeros casos, alta taxa de sucesso)
- Seção de artigos recentes (integrada com Firebase)
- Áreas de atuação (6 especialidades)
- Informações de contato
- Modal de login administrativo

### Painel Admin (`admin.html`)
- Autenticação obrigatória via Firebase
- Adicionar artigos (máximo 4, substitui automático)
- Editar artigos existentes
- Excluir artigos
- Contador de linhas (máximo 20)
- Suporte a URLs de imagens externas
- Validação de campos

### Sistema de Artigos
- Máximo 4 artigos simultâneos
- Categorias: Civil, Bancário, Trabalho, Família, Consumidor, Empresarial
- Suporte a imagens via URL externa
- URLs opcionais para "Saiba mais"
- Ordenação por data (mais recentes primeiro)

## 🔧 Configuração de Domínio

Após upload na Hostinger:
- Site principal: `seudominio.com`
- Painel admin: `seudominio.com/admin.html`

## ✅ Teste Final

1. **Página principal**: Carrega corretamente
2. **Firebase Auth**: Login funcionando
3. **Firestore**: CRUD de artigos operacional
4. **Responsivo**: Mobile-friendly
5. **Segurança**: Acesso restrito ao admin

## 📞 Suporte

Se houver problemas:
1. Verifique console do navegador (F12)
2. Confirme configuração Firebase
3. Teste conectividade
4. Verifique regras do Firestore

---
**Status**: ✅ Conversão completa de Node.js para site estático
**Hospedagem**: Pronto para Hostinger
**Firebase**: Configurado com valores reais