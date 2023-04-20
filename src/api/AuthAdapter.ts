import { IUser } from "@/models/User";

export class AuthAdapter {
  static transform(userItem: any): IUser {
    return {
      id: userItem.id,
      email: userItem.email,
      name: userItem.name,
      surname: userItem.surname,
      companyName: userItem.company_name,
      phone: userItem.phone,
    };
  }
}
