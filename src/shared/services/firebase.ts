import { ref, computed } from 'vue';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  doc,
  onSnapshot as onFirestoreSnapshot,
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
  uid?: string | null;
  userId?: string | null;
  email?: string | null;
  displayName?: string | null;
  name?: string | null;
  photoURL?: string | null;
  photoUrl?: string | null;
  idToken?: string | null;
  accessToken?: string | null;
  id_token?: string | null;
  access_token?: string | null;
  token?: string | null;
}

export interface SessionUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
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

// Reactive indicator for whether the dashboard is running inside Flutter InAppWebView shell
export const isWebView = ref<boolean>(
  typeof window !== 'undefined' &&
  (!!window.flutter_inappwebview?.callHandler ||
   (typeof navigator !== 'undefined' && /flutter|wv|tennisappwebview/i.test(navigator.userAgent.toLowerCase())))
);

export function isRunningInWebView(): boolean {
  return isWebView.value;
}

export interface UserSubscription {
  isSubscribed: boolean;
  status: string; // 'active' | 'expired' | 'none'
  plan?: string;
  expiryDateMs?: number;
}

export const userSubscription = ref<UserSubscription>({
  isSubscribed: false,
  status: 'none'
});

export const isUserSubscribed = computed(() => userSubscription.value.isSubscribed);

let subscriptionDocUnsub: (() => void) | null = null;

export function checkAndListenSubscription(userId: string | null) {
  if (subscriptionDocUnsub) {
    subscriptionDocUnsub();
    subscriptionDocUnsub = null;
  }

  if (!userId) {
    userSubscription.value = { isSubscribed: false, status: 'none' };
    return;
  }

  // If running inside Flutter InAppWebView shell, query native in_app_purchase state directly
  if (typeof window !== 'undefined' && window.flutter_inappwebview?.callHandler) {
    window.flutter_inappwebview.callHandler('getSubscriptionStatus').then((res: any) => {
      if (res && (res.isSubscribed === true || res.status === 'active')) {
        userSubscription.value = {
          isSubscribed: true,
          status: 'active',
          plan: res.productId || 'pro_monthly'
        };
      }
    }).catch(() => {});
  }

  // Subscribe to Firestore /users/{uid} document for cross-platform active status
  try {
    const userDocRef = doc(db, 'users', userId);
    subscriptionDocUnsub = onFirestoreSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const sub = data?.subscription;
        const isActive = sub?.status === 'active' || sub?.isSubscribed === true;
        userSubscription.value = {
          isSubscribed: isActive,
          status: sub?.status || (isActive ? 'active' : 'none'),
          plan: sub?.plan || sub?.productId,
          expiryDateMs: sub?.expiryDateMs
        };
      } else {
        userSubscription.value = { isSubscribed: false, status: 'none' };
      }
    }, (err) => {
      console.warn('[Firebase Auth] Subscription listener error:', err);
    });
  } catch (e) {
    console.warn('[Firebase Auth] Could not listen to subscription doc:', e);
  }
}

// Reactive/shared native user state for immediate WebView session availability
let nativeSessionUser: SessionUser | null = null;
type SessionListener = (user: SessionUser | null) => void;
const sessionListeners = new Set<SessionListener>();

function notifySessionListeners(user: SessionUser | null) {
  checkAndListenSubscription(user?.uid || null);
  for (const listener of sessionListeners) {
    try {
      listener(user);
    } catch (e) {
      console.error('[Firebase Auth] Error in session listener:', e);
    }
  }
}

export function getActiveSessionUser(): SessionUser | null {
  if (auth.currentUser) {
    return {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || nativeSessionUser?.displayName || null,
      email: auth.currentUser.email || nativeSessionUser?.email || null,
      photoURL: auth.currentUser.photoURL || nativeSessionUser?.photoURL || null
    };
  }
  return nativeSessionUser;
}

export function onUserSessionChanged(callback: SessionListener): () => void {
  sessionListeners.add(callback);
  const current = getActiveSessionUser();
  if (current) {
    checkAndListenSubscription(current.uid);
    callback(current);
  }
  const unsubFirebase = onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      const merged: SessionUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || nativeSessionUser?.displayName || null,
        email: fbUser.email || nativeSessionUser?.email || null,
        photoURL: fbUser.photoURL || nativeSessionUser?.photoURL || null
      };
      checkAndListenSubscription(merged.uid);
      callback(merged);
    } else {
      checkAndListenSubscription(nativeSessionUser?.uid || null);
      callback(nativeSessionUser);
    }
  });

  return () => {
    sessionListeners.delete(callback);
    unsubFirebase();
  };
}

/**
 * Returns a Promise that resolves with the current authenticated User (or native session user).
 * Resolves promptly without blocking startup if unauthenticated.
 */
export const getCurrentUser = (): Promise<User | SessionUser | null> => {
  return new Promise((resolve) => {
    const active = getActiveSessionUser();
    if (active) {
      resolve(active);
      return;
    }

    let settled = false;
    const finish = (u: User | SessionUser | null) => {
      if (settled) return;
      settled = true;
      resolve(u);
    };

    const timer = setTimeout(() => {
      finish(getActiveSessionUser());
    }, 500);

    const unsubscribe = onUserSessionChanged((u) => {
      if (u) {
        clearTimeout(timer);
        unsubscribe();
        finish(u);
      }
    });

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      clearTimeout(timer);
      unsubAuth();
      unsubscribe();
      finish(u || getActiveSessionUser());
    });
  });
};

/**
 * Signs out the current user and notifies the native Flutter shell if running inside WebView.
 */
export async function signOutUser(): Promise<void> {
  nativeSessionUser = null;
  notifySessionListeners(null);
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

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Initiates Google Sign-In using Firebase Auth popup (ideal for Desktop and standard browsers).
 * Gracefully falls back to redirect if popup is blocked by the browser.
 */
export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    return userCredential;
  } catch (error: unknown) {
    const authError = error as { code?: string; message?: string };
    if (authError?.code === 'auth/popup-closed-by-user' || authError?.code === 'auth/cancelled-popup-request') {
      console.log('[Firebase Auth] Sign-in popup closed by user.');
      return null;
    }
    if (authError?.code === 'auth/popup-blocked') {
      console.warn('[Firebase Auth] Popup blocked by browser, attempting redirect fallback...');
      await signInWithRedirect(auth, googleAuthProvider);
      return null;
    }
    console.error('[Firebase Auth] Error during signInWithGoogle:', error);
    throw error;
  }
}

/**
 * Authenticates with Firebase using credentials extracted from a native auth session payload.
 * Gracefully sets the user profile immediately if native uid/profile is present or if credential sign-in fails.
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
      idToken = session;
    }
  }

  let extractedUid: string | null = null;
  let extractedName: string | null = null;
  let extractedEmail: string | null = null;
  let extractedPhoto: string | null = null;

  if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed)) {
      idToken = typeof parsed[0] === 'string' ? parsed[0] : null;
      accessToken = typeof parsed[1] === 'string' ? parsed[1] : null;
    } else {
      const s = parsed as NativeAuthSession;
      idToken = s.idToken ?? s.id_token ?? s.token ?? null;
      accessToken = s.accessToken ?? s.access_token ?? null;
      extractedUid = s.uid ?? s.userId ?? null;
      extractedName = s.displayName ?? s.name ?? null;
      extractedEmail = s.email ?? null;
      extractedPhoto = s.photoURL ?? s.photoUrl ?? null;
    }
  }

  // Immediately populate nativeSessionUser if any user info or token was provided
  if (extractedUid || extractedName || extractedEmail || extractedPhoto) {
    nativeSessionUser = {
      uid: extractedUid || auth.currentUser?.uid || 'native_user',
      displayName: extractedName || auth.currentUser?.displayName || 'Franco Berardi',
      email: extractedEmail || auth.currentUser?.email || null,
      photoURL: extractedPhoto || auth.currentUser?.photoURL || null
    };
    notifySessionListeners(getActiveSessionUser());
  }

  if (!idToken && !accessToken) {
    if (nativeSessionUser) {
      return null;
    }
    console.warn('[Firebase Auth] Native session did not contain idToken, accessToken, or uid:', session);
    return null;
  }

  try {
    const credential = GoogleAuthProvider.credential(idToken, accessToken);
    const userCredential = await signInWithCredential(auth, credential);
    nativeSessionUser = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName || extractedName || 'Franco Berardi',
      email: userCredential.user.email || extractedEmail || null,
      photoURL: userCredential.user.photoURL || extractedPhoto || null
    };
    notifySessionListeners(getActiveSessionUser());
    return userCredential;
  } catch (error) {
    console.warn('[Firebase Auth] Credential sign-in failed, using native session fallback:', error);
    if (!nativeSessionUser) {
      nativeSessionUser = {
        uid: extractedUid || auth.currentUser?.uid || 'native_user',
        displayName: extractedName || 'Franco Berardi',
        email: extractedEmail || null,
        photoURL: extractedPhoto || null
      };
    }
    notifySessionListeners(getActiveSessionUser());
    return null;
  }
}

/**
 * Listens for Flutter InAppWebView and triggers getNativeAuthSession handler to authenticate.
 * Also monitors and handles redirect result on standard browser startup.
 */
export function initWebViewAuth(): void {
  // Check for any pending redirect result if on standard web browser
  if (!isWebView.value) {
    getRedirectResult(auth).catch((err) => {
      if (err?.code !== 'auth/null-user') {
        console.warn('[Firebase Auth] getRedirectResult check:', err);
      }
    });
  }

  let isProcessed = false;

  const handleNativeAuth = async () => {
    isWebView.value = true;
    if (isProcessed) return;

    if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
      isProcessed = true;
      try {
        const session = await window.flutter_inappwebview.callHandler('getNativeAuthSession');
        if (session) {
          await authenticateWithNativeSession(session);
        }
      } catch (error) {
        console.error('[WebView Auth] Error during getNativeAuthSession handshake:', error);
        isProcessed = false;
      }
    }
  };

  window.onNativeAuthSession = authenticateWithNativeSession;

  if (window.flutter_inappwebview?.callHandler) {
    isWebView.value = true;
    handleNativeAuth();
  }

  window.addEventListener('flutterInAppWebViewPlatformReady', () => {
    isWebView.value = true;
    handleNativeAuth();
  });

  let attempts = 0;
  const maxAttempts = 10;
  const pollTimer = setInterval(() => {
    if (isProcessed || attempts >= maxAttempts) {
      clearInterval(pollTimer);
      return;
    }
    attempts++;
    if (window.flutter_inappwebview?.callHandler) {
      isWebView.value = true;
      clearInterval(pollTimer);
      handleNativeAuth();
    }
  }, 300);
}
