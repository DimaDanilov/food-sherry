import React from "react";
import { makeAutoObservable } from "mobx";

export interface User {
  id: number;
  email: string;
}

class AuthStore {
  user: User = {} as User;
  firstLoadCompleted: boolean = false; // Param for first page loading

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = { ...user };
  }
  setFirstLoadStatus(status: boolean) {
    this.firstLoadCompleted = status;
  }
}

export const AuthInstance = new AuthStore();
export const AuthContext = React.createContext(AuthInstance);

export const useAuthStore = () => {
  return React.useContext(AuthContext);
};

export default AuthInstance;
