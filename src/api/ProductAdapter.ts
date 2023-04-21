import { IProduct } from "@/models/Product";
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
}
