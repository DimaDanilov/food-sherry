import { FoodItem } from "@/models/FoodItem";

export interface IUserData {
  name: string;
  surname: string;
  registrationDate: string;
  adsCreated: number;
  adsTaken: number;
  ads: Array<FoodItem>;
}
