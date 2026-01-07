import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useIsAdmin } from "../hooks/useIsAdmin";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdmin, checking } = useIsAdmin();

  if (loading || checking) {
    return (
      <section className="section">
        <div className="container">Duke kontrolluar aksesin...</div>
      </section>
    );
  }

  if (!user) return <Navigate to="/admin-login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
