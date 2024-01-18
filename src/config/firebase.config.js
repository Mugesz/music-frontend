import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTRXa2aLmjVsto47V5jWrYBGOLSUFWAfQ",
  authDomain: "projectmusicapp-cbe80.firebaseapp.com",
  databaseURL: "https://projectmusicapp-cbe80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectmusicapp-cbe80",
  storageBucket: "projectmusicapp-cbe80.appspot.com",
  messagingSenderId: "650572130720",
  appId: "1:650572130720:web:4a82d5981f851d80cd5cc5"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
