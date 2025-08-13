import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKKLAXfNlwD6eqvkIltZhQ9F4TTPEHzek",
  authDomain: "lodiadvocacia-79fd5.firebaseapp.com",
  projectId: "lodiadvocacia-79fd5",
  storageBucket: "lodiadvocacia-79fd5.firebasestorage.app",
  messagingSenderId: "616201446435",
  appId: "1:616201446435:web:c53eecd4e0b77bceaf3d96",
  measurementId: "G-E7Z7T853MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
try {
  // Firebase will automatically enable offline persistence
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export default app;