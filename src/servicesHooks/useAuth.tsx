import { StudentSignup } from "Auth";
import { useMemo, useState } from "react";
import { auth } from "../service/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  function postStudent(data: StudentSignup, toHome: (user: any) => void) {
    setLoading(true);
    auth
      .postStudent(data)
      .then(() => 
        toHome(true)
      )
      .catch(() =>
       toHome(error)
        // error.response
        //   ? setError(error.response.data.message)
        //   : setError(error.message)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  return useMemo(() => ({ loading, error, postStudent }), [loading, error]);
}
