import React from "react";
import { makeAutoObservable } from "mobx";

class GiveProductStore {
  productSelect = 0;
  productTitle: string = "";
  productDescription: string = "";
  productAmount: string = "";
  productAddress: string = "";
  productDatetimeToTake: string = "";
  productImages: Array<File> = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateProductSelect(select: string) {
    this.productSelect = Number(select);
  }
  updateProductTitle(title: string) {
    this.productTitle = title;
  }
  updateProductDescription(description: string) {
    this.productDescription = description;
  }
  updateProductAmount(amount: string) {
    this.productAmount = amount;
  }
  updateProductAddress(address: string) {
    this.productAddress = address;
  }
  updateProductDatetimeToTake(datetime: string) {
    this.productDatetimeToTake = datetime;
  }
  updateProductImages(images: Array<File>) {
    this.productImages = images;
  }
  reset() {
    this.updateProductSelect("0");
    this.updateProductTitle("");
    this.updateProductDescription("");
    this.updateProductAmount("");
    this.updateProductAddress("");
    this.updateProductDatetimeToTake("");
    this.updateProductImages([]);
  }
}

export const GiveProductInstance = new GiveProductStore();
export const GiveProductContext = React.createContext(GiveProductInstance);

export const useGiveProductStore = () => {
  return React.useContext(GiveProductContext);
};

export default GiveProductInstance;