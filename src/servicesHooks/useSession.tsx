import { useMemo, useState } from "react";
import { auth } from "../service/auth";

export function useSession() {
  const [session, setSession] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>();

  function isTokenValid(token: string) {
    setLoading(true);
    auth
      .session(token)
      .then((res) => {
        setSession(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    return session;
  }

  return useMemo(() => ({ loading, error, isTokenValid }), [loading, error]);
}
