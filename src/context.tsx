import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "./api/axios";

interface ContextProvdierProps {
  children: ReactNode;
}

export interface UserProps {
  cell: string;
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  };
  location: {
    city: string;
    country: string;
    postcode: number;
    state: string;
    street: string;
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface UserContextProps {
  user: UserProps[];
  UserList: UserProps[];
  loading: boolean;
  GetUDataUser: (filter?: string) => void;
  SetNewList: (NewData: UserProps[]) => void;
  FilterUsers(currentFilter: string): void;
}

export const UserContext = createContext({} as UserContextProps);

export function ContextProvdier({ children }: ContextProvdierProps) {
  const [user, setUser] = useState<UserProps[]>([]);
  const [UserList, setUserList] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(false);

  async function GetUDataUser(filter?: string) {
    setLoading(true);
    const Result = await api.get("/?results=10&nat=br&seed=123", {
      params: {
        filter,
      },
    });
    setLoading(false);
    setUser(Result.data.results);
    setUserList(Result.data.results);
  }

  function SetNewList(NewData: UserProps[]) {
    setUserList(NewData);
  }

  useEffect(() => {
    GetUDataUser();
  }, []);

  function SearchInFilter(currentFilter: string) {
    if (currentFilter === "All") {
      return user;
    } else {
      return user.filter((item) => {
        return (
          item.gender.toLocaleLowerCase() === currentFilter.toLocaleLowerCase()
        );
      });
    }
  }
  
  function FilterUsers(currentFilter: string) {
    SetNewList(SearchInFilter(currentFilter));
  }

  return (
    <UserContext.Provider
      value={{
        user,
        GetUDataUser,
        SetNewList,
        UserList,
        loading,
        FilterUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
