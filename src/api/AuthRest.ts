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

// export const registration = async (email, password) => {
//   const { data } = await $host.post("api/user/registration", {
//     email,
//     password,
//     role: "ADMIN",
//   });
//   localStorage.setItem("token", data.token);
//   return jwt_decode(data.token);
// };
