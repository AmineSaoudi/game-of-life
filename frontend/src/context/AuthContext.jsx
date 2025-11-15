import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext(null);
const API_BASE = "http://10.121.13.65:3000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // no token -> not authenticated, skip /me
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/auth/me`, {
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
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
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
