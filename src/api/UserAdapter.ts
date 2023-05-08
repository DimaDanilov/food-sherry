import { UserModel } from "@/models/User";

export interface UserShortData {
  users: UserShortModel[];
  totalCount: number;
}

export interface UserShortModel {
  id: number;
  name: string;
  surname: string;
  companyName: string;
  avatar: string;
}

export class UserAdapter {
  static imageUrlTransform(imageUrl: string) {
    return imageUrl
      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/profile_avatars/${imageUrl}`
      : "";
  }
  static transform(userItem: any): UserModel {
    return {
      id: userItem.id,
      email: userItem.email,
      name: userItem.name,
      surname: userItem.surname,
      companyName: userItem.company_name,
      phone: userItem.phone,
      avatar: this.imageUrlTransform(userItem.avatar),
      timeCreated: userItem.time_created,
    };
  }
  static transformShort(userItem: any): UserShortModel {
    return {
      id: userItem.id,
      name: userItem.name,
      surname: userItem.surname,
      companyName: userItem.company_name,
      avatar: this.imageUrlTransform(userItem.avatar),
    };
  }
  static transformShortArray(data: any): UserShortData {
    return {
      users: data.rows.map((item: any) => this.transformShort(item)),
      totalCount: data.count,
    };
  }
}
