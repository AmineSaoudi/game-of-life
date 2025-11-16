import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

    if (!token) {
      // no token -> not authenticated
      setUser(null);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Invalid or expired token");

      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      console.error(err);
      // token is bad -> clear it
      localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
      setUser(null);
    }
  }, []);

  // initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    })();
  }, [fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    setUser(null);
  }, []);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
    refetchUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
