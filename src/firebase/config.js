import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArmD0Hv-IjVya0NzMkv8-W_WQrxqPYWHg",
  authDomain: "querollo-b7d3a.firebaseapp.com",
  projectId: "querollo-b7d3a",
  storageBucket: "querollo-b7d3a.firebasestorage.com",
  messagingSenderId: "398011177601",
  appId: "1:398011177601:web:f03a8e41605b29c649cb80"
};

// Evitar inicialización duplicada
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Crear Auth con persistencia para React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
