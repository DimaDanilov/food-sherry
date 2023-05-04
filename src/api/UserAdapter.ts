import { UserModel } from "@/models/User";

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
}
