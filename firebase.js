// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAavJDBh63LO3kLH8yjalw8qmBTpgpJbVo",
    authDomain: "connectfirebase-30915.firebaseapp.com",
    projectId: "connectfirebase-30915",
    storageBucket: "connectfirebase-30915.firebasestorage.app",
    messagingSenderId: "986680468037",
    appId: "1:986680468037:web:f7fb0868194adb1b3cf92c",
    measurementId: "G-MWWJD37FS7"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,   // บังคับใช้ long-polling
    useFetchStreams: false,               // ตัดโหมด fetch streams ที่บางเครือข่ายบล็อก
    longPollingOptions: { timeoutSeconds: 30 },

    // ทางเลือก: cache ทนหลายแท็บ (ไม่บังคับ)
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
