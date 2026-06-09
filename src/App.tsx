import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

function AppRoutes() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

function App() {
  const [clerkModule, setClerkModule] = useState<any>(null);

  useEffect(() => {
    if (PUBLISHABLE_KEY) {
      import('@clerk/clerk-react').then((mod) => {
        setClerkModule(mod);
      });
    }
  }, []);

  if (PUBLISHABLE_KEY && clerkModule) {
    const { ClerkProvider } = clerkModule;
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AppRoutes />
      </ClerkProvider>
    );
  }

  if (PUBLISHABLE_KEY && !clerkModule) {
    // Loading state while Clerk loads
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#00f3ff', textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '2px solid #00f3ff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ fontSize: '14px' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
