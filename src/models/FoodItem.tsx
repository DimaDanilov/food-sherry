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
  imageSrc: string;
  status: "open" | "reserved" | "closed";
}
