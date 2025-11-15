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

  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

    if (!token) {
      // no token -> not authenticated, skip /me
      console.log("NO TOKEN");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid or expired token");
        return res.json();
      })
      .then((user) => {
        setUser(user); // backend returns user on /me
      })
      .catch((err) => {
        console.error(err);
        // token is bad -> clear it
        localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    setUser(null);
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
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
