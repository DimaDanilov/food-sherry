import axios from "axios";
import { IProduct } from "@/models/Product";
import { FoodAdapter, ProductsData } from "./FoodAdapter";

export const API_URL = "http://localhost:5000";

export async function loadAllProducts(
  page: number,
  search: string
): Promise<ProductsData> {
  const url = `${API_URL}/api/product?page=${page}${
    search && `&search=${search}`
  }`;
  const response = await axios.get<ProductsData>(url);
  return FoodAdapter.transformArray(response.data);
}

export async function loadOneProduct(productId: string): Promise<IProduct> {
  const response = await axios.get<IProduct>(
    `${API_URL}/api/product/${productId}`
  );
  return FoodAdapter.transform(response.data);
}

export async function postProduct(product: any) {
  const formData = new FormData();
  for (let key in product) {
    if (key === "images") {
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
    } else {
      formData.append(key, product[key]);
    }
  }
  axios.post(`${API_URL}/api/product`, formData);
  // ДОРАБОТАТЬ
  // .then(response => this.setState({ articleId: response.data.id }));
}
