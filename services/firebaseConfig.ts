import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage';

const firebaseConfig = {
  // apiKey: 'YOUR_API_KEY',
  // authDomain: 'YOUR_AUTH_DOMAIN',
  // projectId: 'jobboard-335d5',
  storageBucket: 'gs://jobboard-335d5.appspot.com',
  // messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  // appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
