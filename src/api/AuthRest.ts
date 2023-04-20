import { User } from "@/store/AuthStore";
import axios from "axios";
import jwt_decode from "jwt-decode";

const authConfig = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjgxOTEyNjI5LCJleHAiOjE2ODE5OTkwMjl9.OGcgWwj7E2wYzzUfZqJ0rErI_s3lgLd-04VFR90VJRQ`,
  },
};

interface IToken {
  token: string;
}

export async function auth(token: string): Promise<User> {
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
    return {} as User;
  }
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await axios.post("http://localhost:5000/api/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
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
  await axios.post("http://localhost:5000/api/register_user", {
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
  await axios.post("http://localhost:5000/api/register_company", {
    email,
    password,
    company_name: companyName,
    phone,
  });
}
