import { useUser, useClerk } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useAuthClerk(): any {
  const { user, isSignedIn, isLoaded } = useUser();
  const { openSignIn, signOut } = useClerk();
  return { user, isSignedIn, isLoaded, openSignIn, signOut };
}

// Safe hook that works whether Clerk is configured or not
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAuth(): any {
  // If Clerk is not configured, return mock auth state
  if (!PUBLISHABLE_KEY) {
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
      openSignIn: () => {
        console.warn('Clerk no esta configurado. Agrega VITE_CLERK_PUBLISHABLE_KEY.');
      },
      signOut: async () => {},
    };
  }

  // Clerk is configured - safe to use hooks
  try {
    return useAuthClerk();
  } catch (err) {
    console.error('Clerk auth error:', err);
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
      openSignIn: () => {
        console.warn('Error al inicializar Clerk.');
      },
      signOut: async () => {},
    };
  }
}
