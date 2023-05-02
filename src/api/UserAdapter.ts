import { UserModel } from "@/models/User";

export class UserAdapter {
  static transform(userItem: any): UserModel {
    return {
      id: userItem.id,
      email: userItem.email,
      name: userItem.name,
      surname: userItem.surname,
      companyName: userItem.company_name,
      phone: userItem.phone,
      timeCreated: userItem.time_created,
    };
  }
}
