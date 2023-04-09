import { FoodItem } from "@/models/FoodItem";

export interface ProductsData {
  products: FoodItem[];
  totalCount: number;
}

export class FoodAdapter {
  static transform(data: any): { products: FoodItem[]; totalCount: number } {
    return {
      products: data.products.map(
        (item: any) =>
          <FoodItem>{
            id: item.id,
            title: item.title,
            author: item.author,
            category: item.category,
            description: item.description,
            amount: item.amount,
            timeCreated: item.time_created,
            timeToTake: item.time_to_take,
            location: item.location,
            phone: item.phone,
            imageSrc: item.image_src,
            status: item.status,
          }
      ),
      totalCount: data.total_count,
    };
  }
}
