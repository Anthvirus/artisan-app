import {initializeApp} from 'firebase/app';
import {getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC0zgIpsiMjAlwYD4YGAkDDcJYQV5G4aiw",
    authDomain: "artisan-web-app-ae4bd.firebaseapp.com",
    projectId: "artisan-web-app-ae4bd",
    storageBucket: "artisan-web-app-ae4bd.appspot.com",
    messagingSenderId: "165952235620",
    appId: "1:165952235620:web:802fd8978fc3bf6d92d771",
    measurementId: "G-8HZQ9C5014"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const signOut = getSignOut(app)
export const db = getFirestore(app);
export const storage = getStorage(app);

// To-do:
// Taking in user credentials
// Handle authentication using firebaseAuth
// After creating user, take userId from firebaseAuth and use it as documentId for cloud firestore (collection: users)