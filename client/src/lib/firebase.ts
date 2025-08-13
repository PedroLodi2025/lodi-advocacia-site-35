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

// Development mode setup
if (process.env.NODE_ENV === 'development' && !auth.emulatorConfig) {
  try {
    // Only connect to emulators if they're available (optional for production Firebase)
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Firebase emulators not available, using production Firebase');
  }
}

export default app;