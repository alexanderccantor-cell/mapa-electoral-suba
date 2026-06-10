export function useAuth() {
  return {
    isSignedIn: false,
    isLoaded: true,
    user: null,
    openSignIn: () => {
      console.warn('Clerk no configurado');
    },
    signOut: async () => {},
  };
}
