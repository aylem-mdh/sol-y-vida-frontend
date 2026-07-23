import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Role = "admin" | "worker" | "family" | "client";

type Props = {
  children: ReactNode;
  allowedRoles: Role[];
};

function getDefaultRoute(role: string | null) {
  switch (role) {
    case "admin":
      return "/admin";
    case "worker":
      return "/worker";
    case "family":
      return "/family";
    default:
      return "/login";
  }
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(role as Role)) {
    return <Navigate to={getDefaultRoute(role)} replace />;
  }

  return <>{children}</>;
}