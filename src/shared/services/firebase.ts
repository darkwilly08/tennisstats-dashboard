import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type Auth,
  type User,
  type UserCredential
} from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
  type Firestore
} from 'firebase/firestore';

declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: unknown[]) => Promise<unknown>;
    };
    onNativeAuthSession?: (session: unknown) => Promise<UserCredential | null>;
  }
}

export interface NativeAuthSession {
  idToken?: string | null;
  accessToken?: string | null;
  id_token?: string | null;
  access_token?: string | null;
  token?: string | null;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA0w_6Wu_17dXqOeKeY3-ty0WEgrXEx7q8',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tennis-app-stats.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tennis-app-stats',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tennis-app-stats.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '653696661070',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:653696661070:web:2a73180e06009f9a7db51f',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-3W9S77JTWM'
};

export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// Initialize Firestore with offline persistence
let firestoreDb: Firestore;
try {
  firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
} catch {
  firestoreDb = getFirestore(app);
}

export const db: Firestore = firestoreDb;

/**
 * Returns a Promise that resolves with the current authenticated User.
 * Waits for the initial Firebase auth state to resolve if not yet ready.
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

/**
 * Signs out the current user and notifies the native Flutter shell if running inside WebView.
 */
export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.error('[Firebase Auth] Error during signOut:', err);
  }
  if (window.flutter_inappwebview?.callHandler) {
    try {
      await window.flutter_inappwebview.callHandler('onSignOut');
    } catch {
      // ignore
    }
  }
}

/**
 * Authenticates with Firebase using credentials extracted from a native auth session payload.
 */
export async function authenticateWithNativeSession(session: unknown): Promise<UserCredential | null> {
  if (!session) {
    console.warn('[Firebase Auth] Received empty native auth session');
    return null;
  }

  let idToken: string | null = null;
  let accessToken: string | null = null;
  let parsed: unknown = session;

  if (typeof session === 'string') {
    try {
      parsed = JSON.parse(session);
    } catch {
      // Session might be a raw token string
      idToken = session;
    }
  }

  if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed)) {
      idToken = typeof parsed[0] === 'string' ? parsed[0] : null;
      accessToken = typeof parsed[1] === 'string' ? parsed[1] : null;
    } else {
      const s = parsed as NativeAuthSession;
      idToken = s.idToken ?? s.id_token ?? s.token ?? null;
      accessToken = s.accessToken ?? s.access_token ?? null;
    }
  }

  if (!idToken && !accessToken) {
    console.warn('[Firebase Auth] Native session did not contain idToken or accessToken:', session);
    return null;
  }

  try {
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    const userCredential = await signInWithCredential(auth, credential);
    console.log('[Firebase Auth] Successfully signed in via native session. UID:', userCredential.user.uid);
    return userCredential;
  } catch (error) {
    console.error('[Firebase Auth] Error signing in with native credential:', error);
    throw error;
  }
}

/**
 * Listens for Flutter InAppWebView and triggers getNativeAuthSession handler to authenticate.
 */
export function initWebViewAuth(): void {
  let isProcessed = false;

  const handleNativeAuth = async () => {
    if (isProcessed) return;

    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      isProcessed = true;
      try {
        console.log('[WebView Auth] Querying flutter_inappwebview callHandler: getNativeAuthSession');
        const session = await window.flutter_inappwebview.callHandler('getNativeAuthSession');
        if (session) {
          await authenticateWithNativeSession(session);
        } else {
          console.log('[WebView Auth] getNativeAuthSession returned empty session');
        }
      } catch (error) {
        console.error('[WebView Auth] Error during getNativeAuthSession handshake:', error);
        isProcessed = false; // Allow retry if handshake failed
      }
    }
  };

  // Provide global hook for direct Flutter script evaluation if needed
  window.onNativeAuthSession = authenticateWithNativeSession;

  // 1. Immediately check if flutter_inappwebview is already present
  if (window.flutter_inappwebview?.callHandler) {
    handleNativeAuth();
  }

  // 2. Listen to flutterInAppWebViewPlatformReady event
  window.addEventListener('flutterInAppWebViewPlatformReady', () => {
    handleNativeAuth();
  });

  // 3. Fallback interval polling for late bridge injection
  let attempts = 0;
  const maxAttempts = 10;
  const pollTimer = setInterval(() => {
    if (isProcessed || attempts >= maxAttempts) {
      clearInterval(pollTimer);
      return;
    }
    attempts++;
    if (window.flutter_inappwebview?.callHandler) {
      clearInterval(pollTimer);
      handleNativeAuth();
    }
  }, 300);
}
