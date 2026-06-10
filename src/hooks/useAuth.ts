import { useUser, useClerk } from '@clerk/clerk-react';

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: any;
  openSignIn: () => void;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const { user, isSignedIn, isLoaded } = useUser();
  const { openSignIn, signOut } = useClerk();

  return {
    isSignedIn: isSignedIn || false,
    isLoaded,
    user: user ?? null,
    openSignIn: () => openSignIn(),
    signOut: () => signOut(),
  };
}
