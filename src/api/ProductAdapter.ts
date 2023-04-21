import {
  IProduct,
  IProductProfile,
  IProductStatusInfo,
} from "@/models/Product";
import { API_URL } from "./ProductApi";

export interface ProductsData {
  products: IProduct[];
  totalCount: number;
}

export class ProductAdapter {
  static imagesUrlTransform(images: Array<string>) {
    return (
      images?.map((imageUrl) => `${API_URL}/food_images/${imageUrl}`) || ""
    );
  }
  static transform(productItem: any): IProduct {
    return {
      id: productItem.id,
      title: productItem.title,
      author: {
        id: productItem.author.id,
        name: productItem.author.name,
        surname: productItem.author.surname,
        companyName: productItem.author.company_name,
        email: productItem.author.email,
        phone: productItem.author.phone,
      },
      clientId: productItem.client_id,
      category: productItem.category,
      description: productItem.description,
      amount: productItem.amount,
      timeCreated: productItem.time_created,
      timeToTake: productItem.time_to_take,
      location: productItem.location,
      imagesSrc: this.imagesUrlTransform(productItem.images),
      status: productItem.status,
    };
  }
  static transformArray(data: any): {
    products: IProduct[];
    totalCount: number;
  } {
    return {
      products: data.products.map((item: any) => this.transform(item)),
      totalCount: data.total_count,
    };
  }
  static transformUpdatedStatus(newStatusInfo: any): IProductStatusInfo {
    return {
      id: newStatusInfo.id,
      clientId: newStatusInfo.client_id,
      status: newStatusInfo.status,
    };
  }
  static transformProfileProduct(product: any): IProductProfile {
    return {
      id: product.id,
      title: product.title,
      imagesSrc: this.imagesUrlTransform(product.images),
      status: product.status,
    };
  }
  static transformProfileProductArray(data: any): IProductProfile[] {
    return data.map((item: any) => this.transformProfileProduct(item));
  }
}
