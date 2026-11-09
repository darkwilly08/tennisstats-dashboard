import { ref, computed } from 'vue';
import {
  getActiveSessionUser,
  onUserSessionChanged,
  signOutUser,
  type SessionUser
} from '@/shared/services/firebase';

const currentUser = ref<SessionUser | null>(getActiveSessionUser());

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

  const displayName = computed(() => {
    if (currentUser.value?.displayName) {
      return currentUser.value.displayName;
    }
    const prefix = currentUser.value?.email ? currentUser.value.email.split('@')[0] : '';
    if (prefix) {
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Franco Berardi';
  });

  const email = computed(() => {
    return currentUser.value?.email || 'Sin sesión activa';
  });

  const photoURL = computed(() => {
    return currentUser.value?.photoURL || null;
  });

  const initials = computed(() => {
    const name = displayName.value;
    const parts = name.trim().split(/\s+/);
    const p0 = parts[0] || '';
    const p1 = parts[1] || '';
    if (p0 && p1) {
      return (p0.charAt(0) + p1.charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  const logout = async () => {
    await signOutUser();
  };

  return {
    user,
    isAuthenticated,
    displayName,
    email,
    photoURL,
    initials,
    logout
  };
}
