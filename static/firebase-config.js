// Firebase Configuration
// IMPORTANTE: Substitua estes valores pelos valores reais do seu projeto Firebase

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com", 
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Instruções para configurar o Firebase:
// 
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um novo projeto ou use um existente
// 3. Vá em "Project Settings" > "General" > "Your apps"
// 4. Clique em "Add app" e selecione "Web"
// 5. Registre o app e copie as configurações
// 6. Substitua os valores acima pelos valores reais
// 
// 7. Habilite Authentication:
//    - Vá em "Authentication" > "Sign-in method"
//    - Habilite "Email/Password"
//    - Adicione um usuário administrativo em "Users"
//
// 8. Configure Firestore Database:
//    - Vá em "Firestore Database" > "Create database"
//    - Escolha "Start in production mode"
//    - Configure as regras de segurança:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /articles/{document} {
//          allow read: if true;
//          allow write: if request.auth != null;
//        }
//      }
//    }

console.log('Firebase Config carregado. Lembre-se de substituir os valores de configuração!');