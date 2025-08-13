// Firebase Configuration
// IMPORTANTE: Substitua estes valores pelos valores reais do seu projeto Firebase

const firebaseConfig = {
    apiKey: "AIzaSyAKKLAXfNlwD6eqvkIltZhQ9F4TTPEHzek",
    authDomain: "lodiadvocacia-79fd5.firebaseapp.com",
    projectId: "lodiadvocacia-79fd5",
    storageBucket: "lodiadvocacia-79fd5.firebasestorage.app",
    messagingSenderId: "616201446435",
    appId: "1:616201446435:web:c53eecd4e0b77bceaf3d96",
    measurementId: "G-E7Z7T853MQ"
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