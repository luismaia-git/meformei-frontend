import { StudentSignup } from "Auth";
import { User } from "User";
import { useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { auth } from "../service/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const {user, handleUser} = useUser()
  const isAutheticated = !!user
  const [data, setData] = useState<User>();


  function postStudent(data: StudentSignup, toHome: (user: any) => void) {
    setLoading(true);
    auth
      .postStudent(data)
      .then(() => 
        toHome(true)
      )
      .catch((e) =>{
        
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

  return useMemo(() => ({ loading, error, postStudent, isAutheticated}), [loading, error]);
}
