import { ICategory } from "./Category";
import { IUser } from "./User";

export interface IProduct {
  id: string;
  title: string;
  author: IUser;
  category: ICategory;
  description: string;
  amount: string;
  timeCreated: string;
  timeToTake: string;
  location: string;
  imagesSrc: Array<string>;
  status: "open" | "reserved" | "closed";
}
