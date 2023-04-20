import { IUser } from "@/models/User";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserAdapter } from "./UserAdapter";

interface IToken {
  token: string;
}

export async function auth(token: string): Promise<IUser> {
  const url = `http://localhost:5000/api/auth`;
  try {
    const response = await axios.get<IToken>(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("token", response.data.token);
    return jwt_decode(response.data.token);
  } catch (error) {
    console.error(error);
    return {} as IUser;
  }
}

export async function login(email: string, password: string): Promise<IUser> {
  const { data } = await axios.post("http://localhost:5000/api/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return UserAdapter.transform(jwt_decode(data.token));
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
  await axios.post("http://localhost:5000/api/register", {
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
  await axios.post("http://localhost:5000/api/register", {
    email,
    password,
    company_name: companyName,
    phone,
  });
}
