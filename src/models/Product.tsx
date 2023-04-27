import { ICategory } from "./Category";
import { IUser } from "./User";

export type ProductStatus = "open" | "reserved" | "closed";
export type ProductProfileFilter = "current" | "closed" | "taken";
export enum ProductSort {
  datedown,
  dateup,
}

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
  status: ProductStatus;
}

export interface IProductStatusInfo {
  id: number;
  clientId: number;
  status: ProductStatus;
}

export interface IProductProfile {
  id: number;
  title: string;
  imagesSrc: Array<string>;
  status: ProductStatus;
}
