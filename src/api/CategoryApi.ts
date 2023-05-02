import axios from "axios";
import { CategoryModel } from "@/models/Category";

export async function loadCategories(): Promise<CategoryModel[]> {
  const url = `http://localhost:5000/api/category`;
  const response = await axios.get<CategoryModel[]>(url);
  return response.data;
}
