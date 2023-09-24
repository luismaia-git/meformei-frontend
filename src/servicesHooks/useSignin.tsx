import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserLogin } from "User";
import { useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { auth } from "../service/auth";

export function useSignin() {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { handleUser } = useUser();

  function signin(data: UserLogin, toHome: (user: User | any) => void) {
    setLoading(true);
    setError(undefined);
    auth
      .signin(data)
      .then((res) => {
        setData(res.data);
        handleUser(res.data);
        AsyncStorage.setItem("token", res.data?.token);
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
