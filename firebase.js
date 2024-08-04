// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCGCn0lWsIwpSsAOxYMUXbER5ablYlc9xA',
  authDomain: 'inventory-management-ed219.firebaseapp.com',
  projectId: 'inventory-management-ed219',
  storageBucket: 'inventory-management-ed219.appspot.com',
  messagingSenderId: '1067910344409',
  appId: '1:1067910344409:web:f440b16d58e7e989ef58c8',
  measurementId: 'G-RCGVWX127H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Export Firestore
export { firestore };
