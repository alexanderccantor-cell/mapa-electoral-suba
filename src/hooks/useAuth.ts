// Este archivo importa Clerk directamente - funciona porque
// ClerkProvider en main.tsx siempre esta presente
import { useUser, useClerk } from '@clerk/clerk-react';

export function useAuth() {
  // Si Clerk no esta configurado, los hooks devuelven estado no-auth
  // sin crashar la aplicacion
  const { user, isSignedIn, isLoaded } = useUser();
  const { openSignIn, signOut } = useClerk();

  return {
    isSignedIn: isSignedIn || false,
    isLoaded: isLoaded ?? true,
    user: user ?? null,
    openSignIn: () => openSignIn(),
    signOut: () => signOut(),
  };
}
