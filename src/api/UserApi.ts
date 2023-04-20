import axios from "axios";
import { IUser } from "@/models/User";
import { UserAdapter } from "./UserAdapter";

export const API_URL = "http://localhost:5000";

export async function loadOneUser(userId: string): Promise<IUser> {
  const response = await axios.get<IUser>(`${API_URL}/api/user/${userId}`);
  return UserAdapter.transform(response.data);
}
