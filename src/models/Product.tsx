import { ICategory } from "./Category";
import { IUser } from "./User";

export interface IProduct {
  id: number;
  title: string;
  author: IUser;
  clientId: number;
  category: ICategory;
  description: string;
  amount: string;
  timeCreated: string;
  timeToTake: string;
  location: string;
  imagesSrc: Array<string>;
  status: "open" | "reserved" | "closed";
}

export interface IProductStatusInfo {
  id: number;
  clientId: number;
  status: "open" | "reserved" | "closed";
}

export interface IProductProfile {
  id: number;
  title: string;
  imagesSrc: Array<string>;
  status: "open" | "reserved" | "closed";
}
