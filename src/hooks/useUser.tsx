import { User } from "User";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { userSave } from "../utils/storange";
import { useSession } from "../servicesHooks/useSession";

export interface IUserContext {
  user?: User;
  handleUser: (u: User) => void;
  deleteUser: (toBack: () => void) => void;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = async () => {
      await userSave.get().then((user) => {
        if (user) setUser(user);
      });
    };

    res();
  }, []);

  const deleteUser = async (toBack: () => void) => {
    setLoading(true);
    userSave
      .delete()
      .then(() => {
        setUser(undefined);
        toBack();
      })
      .finally(() => setLoading(false));
  };

  const handleUser = async (user: User) => {
    setUser(user);
    await userSave.set(user);
  };

  const providerValue = useMemo(
    () => ({
      user,
      handleUser,
      loading,
      deleteUser,
    }),
    [user, loading]
  );
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
