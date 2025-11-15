// import { useUserContext } from "@/context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function GuestRoute() {
  //   const { user, loading } = useUserContext();
  const [user, setUser] = useState("amine");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  if (loading) return <h1 className="text-center">loading</h1>;
  if (user) return <Navigate to="/" state={{ from: location }} replace />;
  return <Outlet />;
}
