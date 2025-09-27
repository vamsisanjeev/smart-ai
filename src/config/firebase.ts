import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // These would be your actual Firebase config values
  apiKey: "demo-api-key",
  authDomain: "smart-travel-guide.firebaseapp.com",
  databaseURL: "https://smart-travel-guide-default-rtdb.firebaseio.com",
  projectId: "smart-travel-guide",
  storageBucket: "smart-travel-guide.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);

export default app;