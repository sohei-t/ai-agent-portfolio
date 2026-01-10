/**
 * Firebase Configuration for ROBO BATTLE V3 Online Mode
 */

const firebaseConfig = {
    apiKey: "AIzaSyDXaFtpAMxiTX72Fa8YXZEwTmwgKWgIbkg",
    authDomain: "robo-battle-v3-game.firebaseapp.com",
    databaseURL: "https://robo-battle-v3-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "robo-battle-v3-game",
    storageBucket: "robo-battle-v3-game.firebasestorage.app",
    messagingSenderId: "254763140382",
    appId: "1:254763140382:web:7290cacfc5e6ee228d750f"
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
