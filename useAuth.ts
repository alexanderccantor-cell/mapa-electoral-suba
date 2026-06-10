const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const IS_CONFIGURED = PUBLISHABLE_KEY.startsWith('pk_') && !PUBLISHABLE_KEY.includes('placeholder');

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: any;
  openSignIn: () => void;
  signOut: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clerkModule: any = null;

if (IS_CONFIGURED) {
  try {
    // @ts-ignore
    clerkModule = require('@clerk/clerk-react');
  } catch {
    clerkModule = null;
  }
}

export function useAuth(): AuthState {
  // If Clerk not configured, return mock
  if (!IS_CONFIGURED || !clerkModule) {
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
      openSignIn: () => {
        alert('Autenticacion no configurada. Configure Clerk primero.');
      },
      signOut: async () => {},
    };
  }

  // Clerk configured - use real hooks
  const { user, isSignedIn, isLoaded } = clerkModule.useUser();
  const { openSignIn, signOut } = clerkModule.useClerk();

  return {
    isSignedIn: isSignedIn || false,
    isLoaded,
    user: user ?? null,
    openSignIn: () => openSignIn(),
    signOut: () => signOut(),
  };
}
