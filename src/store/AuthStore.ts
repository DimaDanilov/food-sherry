import React from "react";
import { makeAutoObservable } from "mobx";
import { IUser } from "@/models/User";

class AuthStore {
  user: IUser = {} as IUser;
  firstLoadCompleted: boolean = false; // Param for first page loading

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
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
