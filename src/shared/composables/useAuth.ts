import { ref, computed } from 'vue';
import {
  getActiveSessionUser,
  onUserSessionChanged,
  signOutUser,
  signInWithGoogle,
  isWebView as isWebViewGlobal,
  type SessionUser
} from '@/shared/services/firebase';

const currentUser = ref<SessionUser | null>(getActiveSessionUser());
const isLoggingIn = ref(false);

let isListenerInitialized = false;

function ensureListener() {
  if (isListenerInitialized) return;
  isListenerInitialized = true;
  onUserSessionChanged((user) => {
    currentUser.value = user;
  });
}

export function useAuth() {
  ensureListener();

  const user = computed(() => currentUser.value);
  const isAuthenticated = computed(() => !!currentUser.value);
  const isWebView = computed(() => isWebViewGlobal.value);

  const displayName = computed(() => {
    if (!currentUser.value) {
      return '';
    }
    if (currentUser.value.displayName) {
      return currentUser.value.displayName;
    }
    const prefix = currentUser.value.email ? currentUser.value.email.split('@')[0] : '';
    if (prefix) {
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Usuario';
  });

  const email = computed(() => {
    return currentUser.value?.email || '';
  });

  const photoURL = computed(() => {
    return currentUser.value?.photoURL || null;
  });

  const initials = computed(() => {
    if (!currentUser.value) return '';
    const name = displayName.value;
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    const p0 = parts[0] || '';
    const p1 = parts[1] || '';
    if (p0 && p1) {
      return (p0.charAt(0) + p1.charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  const loginWithGoogle = async (): Promise<boolean> => {
    if (isLoggingIn.value) return false;
    isLoggingIn.value = true;
    try {
      const cred = await signInWithGoogle();
      return !!cred;
    } finally {
      isLoggingIn.value = false;
    }
  };

  const logout = async () => {
    await signOutUser();
  };

  return {
    user,
    isAuthenticated,
    isWebView,
    isLoggingIn: computed(() => isLoggingIn.value),
    displayName,
    email,
    photoURL,
    initials,
    loginWithGoogle,
    logout
  };
}
