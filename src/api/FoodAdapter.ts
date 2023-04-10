import { FoodItem } from "@/models/FoodItem";

export interface ProductsData {
  products: FoodItem[];
  totalCount: number;
}

export class FoodAdapter {
  static transform(productItem: any): FoodItem {
    return {
      id: productItem.id,
      title: productItem.title,
      author: productItem.author,
      category: productItem.category,
      description: productItem.description,
      amount: productItem.amount,
      timeCreated: productItem.time_created,
      timeToTake: productItem.time_to_take,
      location: productItem.location,
      phone: productItem.phone,
      imageSrc: productItem.image_src,
      status: productItem.status,
    };
  }
  static transformArray(data: any): {
    products: FoodItem[];
    totalCount: number;
  } {
    return {
      products: data.products.map((item: any) => this.transform(item)),
      totalCount: data.total_count,
    };
  }
}
