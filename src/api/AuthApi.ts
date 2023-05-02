import { UserModel } from "@/models/User";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserAdapter } from "./UserAdapter";

type AuthResponse = {
  token: string;
};

export async function auth(token: string): Promise<UserModel> {
  const url = `http://localhost:5000/api/auth`;
  try {
    const { data } = await axios.get<AuthResponse>(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  } catch (error) {
    console.error(error);
    return {} as UserModel;
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserModel> {
  const { data } = await axios.post<AuthResponse>(
    "http://localhost:5000/api/login",
    {
      email,
      password,
    }
  );
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
