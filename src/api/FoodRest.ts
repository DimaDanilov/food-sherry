import axios from "axios";
import { FoodItem } from "@/models/FoodItem";
import { FoodAdapter, ProductsData } from "./FoodAdapter";

export async function loadAllProducts(
  page: number,
  search: string
): Promise<ProductsData> {
  const url = `http://localhost:5000/api/product?page=${page}${
    search && `&search=${search}`
  }`;
  const response = await axios.get<ProductsData>(url);
  return FoodAdapter.transformArray(response.data);
}

export async function loadOneProduct(productId: string): Promise<FoodItem> {
  const response = await axios.get<FoodItem>(
    `http://localhost:5000/api/product/${productId}`
  );
  return FoodAdapter.transform(response.data);
}

export async function postProduct(product: any) {
  axios.post("http://localhost:5000/api/product", product);
  // ДОРАБОТАТЬ
  // .then(response => this.setState({ articleId: response.data.id }));
}
