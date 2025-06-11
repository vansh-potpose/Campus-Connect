"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function RoleGuard({ children, allowedRoles = [] }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (!loading && currentUser && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      router.push('/unauthorized');
    }
  }, [currentUser, loading, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser || (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role))) {
    return null;
  }

  return <>{children}</>;
}