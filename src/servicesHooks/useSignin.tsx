import { useMemo, useState } from "react";
import { auth } from "../service/auth";
import { User, UserLogin } from "User";
import { useUser } from "../hooks/useUser";

export function useSignin() {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { handleUser } = useUser();

  function signin(data: UserLogin, toHome: (user: User) => void) {
    setLoading(true);
    setError(undefined);
    auth
      .signin(data)
      .then((res) => {
        setData(res.data);
        handleUser(res.data);
        toHome(res.data);
      })
      .catch((error) =>
        error.response
          ? setError(error.response.data.message)
          : setError(error.message)
      )
      .finally(() => setLoading(false));
  }

  const isUserError = useMemo(() => {
    return error && error === "User not found.";
  }, [error]);

  const isPasswordError = useMemo(() => {
    return error && error === "Password does not match.";
  }, [error]);

  const isGenericError = useMemo(() => {
    return error && !isUserError && !isPasswordError;
  }, [error]);

  return useMemo(
    () => ({
      data,
      loading,
      error,
      signin,
      isUserError,
      isPasswordError,
      isGenericError,
    }),
    [data, loading, error, isUserError, isPasswordError, isGenericError]
  );
}
