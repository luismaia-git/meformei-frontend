import { StudentSignup } from "Auth";
import { ProfileTO, User, UserPatchRequest } from "User";
import { useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { auth } from "../service/auth";
import { students } from "../service/students";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { user, handleUser } = useUser()
  const isAutheticated = !!user
  const [data, setData] = useState<User>();


  function postStudent(data: StudentSignup, toHome: (user: any) => void) {
    setLoading(true);
    auth
      .postStudent(data)
      .then(() =>
        toHome(true)
      )
      .catch((e) => {

        console.log(e)
        toHome(error)
      }
        // error.response
        //   ? setError(error.response.data.message)
        //   : setError(error.message)
      )
      .finally(() => {
        setLoading(false);
      });
  }

  function patchStudent(data: UserPatchRequest, toDetails: (screen: any) => void) {
    setLoading(true);
    console.log(data);
    auth
    students.
      patchStudent(data)
      .then(() =>
        toDetails(true)
      )
      .catch((e) => {
        toDetails(false)
        console.log(e)
      })
  }

  return useMemo(() => ({ loading, error, postStudent, isAutheticated, patchStudent }), [loading, error]);
}
