import { CategoryModel } from "@/models/Category";
import { axiosBase } from ".";

export async function loadCategories(): Promise<CategoryModel[]> {
  try {
    const response = await axiosBase.get<CategoryModel[]>(`api/category`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
