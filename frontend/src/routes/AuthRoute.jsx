// import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthRoute() {
  //   const { user, loading } = useUserContext();
  const [user, setUser] = useState("amine");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  console.log("Hitting auth route");

  if (loading) return <h1 className="text-center">loading</h1>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
