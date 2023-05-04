import { UserModel } from "@/models/User";
import jwt_decode from "jwt-decode";
import { UserAdapter } from "./UserAdapter";
import { axiosAuth, axiosBase } from ".";

type AuthResponse = {
  token: string;
};

export async function auth(): Promise<UserModel> {
  const { data } = await axiosAuth.get<AuthResponse>(`api/auth`);
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
}

export async function login(
  email: string,
  password: string
): Promise<UserModel> {
  try {
    const { data } = await axiosBase.post<AuthResponse>(`api/login`, {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return UserAdapter.transform(jwt_decode(data.token));
  } catch (e: any) {
    alert(e.response.data.message);
    console.error(e);
    return {} as UserModel;
  }
}

export async function unlogin() {
  localStorage.removeItem("token");
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  surname: string,
  phone: string
) {
  await axiosBase.post(`api/register`, {
    email,
    password,
    name,
    surname,
    phone,
  });
}

export async function registerCompany(
  email: string,
  password: string,
  companyName: string,
  phone: string
) {
  await axiosBase.post(`api/register`, {
    email,
    password,
    company_name: companyName,
    phone,
  });
}
