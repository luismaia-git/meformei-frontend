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
  updateUser: (u: User) => void;
  deleteUser: (toBack: () => void) => void;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  // const newUser: User = {
  //   user: {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     registration: "123456",
  //     curriculumId: "789",
  //     course: {
  //       id: "101",
  //       name: "Computer Science",
  //     },
  //     currentSemester: 2,
  //     enrollmentSemester: 1,
  //     enrollmentYear: 2023,
  //     lastname: "Doe",
  //     studentId: "ST12345",
  //     university: {
  //       id: "201",
  //       name: "University of Example",
  //       abv: "UE",
  //       city: "Exampleville",
  //       state: "EX",
  //     },
  //     username: "johndoe",
  //     city: "Exampleville",
  //     state: "EX",
  //   },
  //   token: "yourAuthToken",
  //   isAdmin: false,
  // };

  useEffect(() => {
    const res = async () => {
      await userSave.get().then((user) => {
        //console.log("user", user);
        if (user) setUser(user);
      });
      // setUser(newUser); //loginPorra
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
