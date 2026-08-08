/**
 * Base44 Auth Wrapper
 * Initializes Base44 authentication
 */

import React, { ReactNode } from "react";

interface Base44AuthWrapperProps {
  children: ReactNode;
}

export function Base44AuthWrapper({ children }: Base44AuthWrapperProps) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const initBase44 = async () => {
      try {
        // Initialize Base44
        // const base44 = await initializeBase44();
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Base44:", error);
        setIsReady(true); // Continue anyway for now
      }
    };

    initBase44();
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default Base44AuthWrapper;
