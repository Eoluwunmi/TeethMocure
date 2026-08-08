/**
 * Role Guard Component
 * Restricts access based on user role
 */

import React, { ReactNode } from "react";
import { useAuth } from "@/lib/AuthContext";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Array<"user" | "marketer" | "owner">;
  fallback?: ReactNode;
}

export default function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      fallback || (
        <div className="p-10 text-center text-red-600">
          <p className="font-bold mb-2">Access Denied</p>
          <p className="text-sm">You must be logged in to access this page.</p>
        </div>
      )
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="p-10 text-center text-red-600">
          <p className="font-bold mb-2">Access Denied</p>
          <p className="text-sm">You do not have permission to access this page.</p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
