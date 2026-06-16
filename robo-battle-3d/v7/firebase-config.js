/**
 * Firebase Configuration for ROBO BATTLE v7 (P2P 最大4人対戦)
 * プロジェクト: robot-battle-v7 / Realtime Database シグナリング用
 */

const firebaseConfig = {
    apiKey: "AIzaSyC3QRCv9nFreuK_1uQn-_RnxgOSYYyZeXE",
    authDomain: "robot-battle-v7.firebaseapp.com",
    databaseURL: "https://robot-battle-v7-default-rtdb.firebaseio.com",
    projectId: "robot-battle-v7",
    storageBucket: "robot-battle-v7.firebasestorage.app",
    messagingSenderId: "809113841299",
    appId: "1:809113841299:web:2584b62e0498a43f8fe766",
    measurementId: "G-4QDHC7RDZC"
};

// Firebase state
let firebaseApp = null;
let firebaseDB = null;
let firebaseInitialized = false;

// Initialize Firebase
async function initFirebase() {
    if (firebaseInitialized) return true;

    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
        const { getDatabase, ref, set, get, update, remove, push, onValue, off } =
            await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');

        firebaseApp = initializeApp(firebaseConfig);
        firebaseDB = getDatabase(firebaseApp);

        // Export to window for online-mode.js
        window.firebaseDB = firebaseDB;
        window.firebaseRef = ref;
        window.firebaseSet = set;
        window.firebaseGet = get;
        window.firebaseUpdate = update;
        window.firebaseRemove = remove;
        window.firebasePush = push;
        window.firebaseOnValue = onValue;
        window.firebaseOff = off;

        firebaseInitialized = true;
        console.log('[Firebase] Initialized successfully');
        return true;
    } catch (e) {
        console.error('[Firebase] Init failed:', e);
        return false;
    }
}

// Check if Firebase is available
function isFirebaseReady() {
    return firebaseInitialized && firebaseDB !== null;
}

// Export
window.initFirebase = initFirebase;
window.isFirebaseReady = isFirebaseReady;
