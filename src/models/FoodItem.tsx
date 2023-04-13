import { ICategory } from "./Category";

export interface FoodItem {
  id: string;
  title: string;
  author: string;
  category: ICategory;
  description: string;
  amount: string;
  timeCreated: string;
  timeToTake: string;
  location: string;
  phone: string;
  imagesSrc: Array<string>;
  status: "open" | "reserved" | "closed";
}
