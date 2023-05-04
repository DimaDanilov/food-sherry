import axios from "axios";
import { CategoryModel } from "@/models/Category";

export async function loadCategories(): Promise<CategoryModel[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/api/category`;
    const response = await axios.get<CategoryModel[]>(url);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
