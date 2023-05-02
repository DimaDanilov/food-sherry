import { CategoryModel } from "./Category";
import { UserModel } from "./User";

export type ProductStatusType = "open" | "reserved" | "closed";
export type ProfileProductFilterType = "current" | "closed" | "taken";
export enum ProductSortType {
  datedown,
  dateup,
}

export interface ProductModel {
  id: number;
  title: string;
  author: UserModel;
  clientId: number;
  category: CategoryModel;
  description: string;
  amount: string;
  timeCreated: string;
  timeToTake: string;
  location: string;
  imagesSrc: Array<string>;
  status: ProductStatusType;
}

export interface ProductStatusModel {
  id: number;
  clientId: number;
  status: ProductStatusType;
}

export interface ProfileProductModel {
  id: number;
  title: string;
  imagesSrc: Array<string>;
  status: ProductStatusType;
}
