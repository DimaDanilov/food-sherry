import { UserModel } from "@/models/User";
import { UserAdapter } from "./UserAdapter";
import { axiosBase, axiosAuth } from ".";

export async function loadUsers(): Promise<UserModel[]> {
  const response = await axiosBase.get<UserModel[]>(`api/user`);
  return response.data;
}

export async function loadOneUser(userId: string): Promise<UserModel> {
  const response = await axiosBase.get<UserModel>(`api/user/${userId}`);
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
  const response = await axiosAuth.put(`api/user`, {
    id: userId,
    name,
    surname,
    company_name: companyName,
    phone,
    email,
  });

  return response.data;
}

export async function updateUserPhoto(id: number, avatarPhoto: any) {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("avatar", avatarPhoto);

  const response = await axiosAuth.put(`api/user/avatar`, formData);

  return UserAdapter.imageUrlTransform(response.data);
}

export async function deleteUserPhoto(userId: number): Promise<UserModel> {
  const response = await axiosAuth.delete(`api/user/avatar/${userId}`);

  return response.data;
}
