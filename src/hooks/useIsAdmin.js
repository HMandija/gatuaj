import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./useAuth";

const allowlistedEmails =
  import.meta.env.VITE_ADMIN_EMAILS?.split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean) || [];

export function useIsAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (loading) return;

      if (!user) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "admins", user.uid));
        const enabledFlag = snap.data()?.enabled;
        const byDoc =
          snap.exists() &&
          (enabledFlag === true ||
            enabledFlag === "true" ||
            enabledFlag === 1 ||
            enabledFlag === "1" ||
            enabledFlag === undefined);
        const byAllowlist =
          user.email && allowlistedEmails.includes(user.email.toLowerCase());
        setIsAdmin(byDoc || byAllowlist);
      } catch {
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    run();
  }, [user, loading]);

  return { isAdmin, checking };
}
