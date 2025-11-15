// import { useUserContext } from "@/context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function GuestRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <h1 className="text-center">loading</h1>;
  if (user) return <Navigate to="/" state={{ from: location }} replace />;
  return <Outlet />;
}
