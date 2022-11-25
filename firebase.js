import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }