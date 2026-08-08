/**
 * Local Storage Hook with TypeScript Support
 * Replaces direct sessionStorage/localStorage calls throughout the app
 */

import { useState, useEffect, useCallback } from "react";

export interface UseLocalStorageOptions {
  sessionOnly?: boolean; // Use sessionStorage instead of localStorage
  syncTabs?: boolean; // Sync across browser tabs
}

/**
 * useLocalStorage - Persistent state hook
 * @param key Storage key
 * @param initialValue Default value if not in storage
 * @param options Configuration options
 * @returns [value, setValue, remove]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { sessionOnly = false, syncTabs = true } = options;
  const storage = sessionOnly ? sessionStorage : localStorage;

  // Initialize state
  const [state, setState] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Failed to read from storage [${key}]:`, error);
      return initialValue;
    }
  });

  // Update storage when state changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(state) : value;
        setState(newValue);
        storage.setItem(key, JSON.stringify(newValue));

        // Dispatch custom event for cross-tab sync
        if (syncTabs && !sessionOnly) {
          window.dispatchEvent(
            new CustomEvent("local-storage-change", {
              detail: { key, value: newValue },
            })
          );
        }
      } catch (error) {
        console.error(`Failed to write to storage [${key}]:`, error);
      }
    },
    [state, key, storage, sessionOnly, syncTabs]
  );

  // Remove from storage
  const remove = useCallback(() => {
    try {
      setState(initialValue);
      storage.removeItem(key);
      if (syncTabs && !sessionOnly) {
        window.dispatchEvent(
          new CustomEvent("local-storage-remove", {
            detail: { key },
          })
        );
      }
    } catch (error) {
      console.error(`Failed to remove from storage [${key}]:`, error);
    }
  }, [key, initialValue, storage, sessionOnly, syncTabs]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (!syncTabs || sessionOnly) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setState(newValue);
        } catch (error) {
          console.error(`Failed to parse storage change for [${key}]:`, error);
        }
      }
    };

    const handleCustomChange = (e: Event) => {
      const event = e as CustomEvent;
      if (event.detail?.key === key) {
        setState(event.detail.value);
      }
    };

    const handleCustomRemove = (e: Event) => {
      const event = e as CustomEvent;
      if (event.detail?.key === key) {
        setState(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage-change", handleCustomChange);
    window.addEventListener("local-storage-remove", handleCustomRemove);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage-change", handleCustomChange);
      window.removeEventListener("local-storage-remove", handleCustomRemove);
    };
  }, [key, initialValue, sessionOnly, syncTabs]);

  return [state, setValue, remove];
}

/**
 * useSessionStorage - Session-only storage (for page visits, etc.)
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  return useLocalStorage(key, initialValue, { sessionOnly: true, syncTabs: false });
}

/**
 * Utility: Check if value is in storage
 */
export function isInStorage(key: string, sessionOnly = false): boolean {
  const storage = sessionOnly ? sessionStorage : localStorage;
  return storage.getItem(key) !== null;
}

/**
 * Utility: Get value from storage without hook
 */
export function getFromStorage<T>(key: string, sessionOnly = false, fallback?: T): T | null {
  const storage = sessionOnly ? sessionStorage : localStorage;
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : fallback ?? null;
  } catch (error) {
    console.error(`Failed to read from storage [${key}]:`, error);
    return fallback ?? null;
  }
}

/**
 * Utility: Set value in storage without hook
 */
export function setInStorage<T>(key: string, value: T, sessionOnly = false): void {
  const storage = sessionOnly ? sessionStorage : localStorage;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to write to storage [${key}]:`, error);
  }
}

/**
 * Utility: Remove from storage without hook
 */
export function removeFromStorage(key: string, sessionOnly = false): void {
  const storage = sessionOnly ? sessionStorage : localStorage;
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from storage [${key}]:`, error);
  }
}

/**
 * Utility: Clear all storage
 */
export function clearStorage(sessionOnly = false): void {
  const storage = sessionOnly ? sessionStorage : localStorage;
  try {
    storage.clear();
  } catch (error) {
    console.error("Failed to clear storage:", error);
  }
}
