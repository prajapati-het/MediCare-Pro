import { ReactNode, Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "doctor")[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.app);
  const location = useLocation();

  if (!isLoggedIn || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export function PublicRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
