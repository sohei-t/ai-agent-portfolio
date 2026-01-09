/**
 * Firebase Configuration for ROBO BATTLE V3 Online Mode
 *
 * ============================================================
 * SETUP INSTRUCTIONS / セットアップ手順
 * ============================================================
 *
 * 1. Create a Firebase project at https://console.firebase.google.com/
 *    Firebase プロジェクトを作成
 *
 * 2. Enable Realtime Database (asia-southeast1 recommended)
 *    Realtime Database を有効化
 *
 * 3. Set Security Rules:
 *    セキュリティルールを設定:
 *    {
 *      "rules": {
 *        "rooms": {
 *          "$roomId": {
 *            ".read": true,
 *            ".write": true
 *          }
 *        }
 *      }
 *    }
 *
 * 4. Copy this file to firebase-config.js and fill in your values
 *    このファイルを firebase-config.js にコピーして値を入力
 *
 * 5. Deploy to Firebase Hosting (optional)
 *    Firebase Hosting にデプロイ（任意）
 * ============================================================
 */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
