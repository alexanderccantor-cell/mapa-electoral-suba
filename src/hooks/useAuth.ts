import { useState, useEffect } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const IS_CONFIGURED = PUBLISHABLE_KEY.length > 10 && !PUBLISHABLE_KEY.includes('placeholder');

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: any;
  openSignIn: () => void;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    isSignedIn: false,
    isLoaded: !IS_CONFIGURED,
    user: null,
    openSignIn: () => {
      console.warn('Clerk no esta configurado. Agrega VITE_CLERK_PUBLISHABLE_KEY.');
    },
    signOut: async () => {},
  });

  useEffect(() => {
    if (!IS_CONFIGURED) return;

    import('@clerk/clerk-react')
      .then((clerk) => {
        setState({
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => {
            try { clerk.useClerk().openSignIn(); } catch { console.warn('Clerk no disponible'); }
          },
          signOut: async () => {
            try { clerk.useClerk().signOut(); } catch { /* noop */ }
          },
        });
      })
      .catch(() => {
        setState({
          isSignedIn: false,
          isLoaded: true,
          user: null,
          openSignIn: () => console.warn('Clerk no disponible'),
          signOut: async () => {},
        });
      });
  }, []);

  return state;
}
