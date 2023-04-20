import axios from "axios";
import { ICategory } from "@/models/Category";

export async function loadCategories(): Promise<ICategory[]> {
  const url = `http://localhost:5000/api/category`;
  const response = await axios.get<ICategory[]>(url);
  return response.data;
}
