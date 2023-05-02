import axios from "axios";
import { UserModel } from "@/models/User";
import { UserAdapter } from "./UserAdapter";

export const API_URL = "http://localhost:5000";

export async function loadOneUser(userId: string): Promise<UserModel> {
  const response = await axios.get<UserModel>(`${API_URL}/api/user/${userId}`);
  return UserAdapter.transform(response.data);
}

type UpdateUserParams = {
  userId: number;
  name?: string;
  surname?: string;
  companyName?: string;
  phone?: string;
  email?: string;
};

export async function updateUser({
  userId,
  name,
  surname,
  companyName,
  phone,
  email,
}: UpdateUserParams): Promise<UserModel> {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/api/user`,
    {
      id: userId,
      name,
      surname,
      company_name: companyName,
      phone,
      email,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
