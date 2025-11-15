// import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function AuthRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  console.log("Hitting auth route");

  if (loading) return <h1 className="text-center">loading</h1>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
