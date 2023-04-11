import React from "react";
import { makeAutoObservable } from "mobx";

class GiveFoodStore {
  productSelect = 0;
  productTitle: string = "";
  productDescription: string = "";
  productAmount: string = "";
  productAddress: string = "";

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
}

export const GiveFoodInstance = new GiveFoodStore();
export const GiveFoodContext = React.createContext(GiveFoodInstance);

export const useGiveFoodStore = () => {
  return React.useContext(GiveFoodContext);
};

export default GiveFoodInstance;
