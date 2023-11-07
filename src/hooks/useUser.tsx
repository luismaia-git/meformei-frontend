import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "User";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../service/config/api";
import { userSave } from "../utils/storage";

export interface IUserContext {
  user?: User;
  handleUser: (u: User) => void;
  updateUser: (u: User) => void;
  deleteUser: (toBack: () => void) => void;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const res = async () => {
      const user = await userSave.get()
        console.log(user.token)
        if (user) {
          setUser(user);
          await AsyncStorage.setItem("token", user.token);
          api.defaults.headers["Authorization"] = `Bearer ${user.token}`;
        }
    };

    res();
  }, []);

  const updateUser = async (user: User) => {
    setLoading(true);
    await handleUser(user)
      .finally(() => setLoading(false));
  };

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
      updateUser,
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
