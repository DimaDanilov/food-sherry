import axios from "axios";
import {
  IProduct,
  IProductProfile,
  IProductStatusInfo,
} from "@/models/Product";
import {
  ProductAdapter,
  ProductsData,
  ProductsProfileData,
} from "./ProductAdapter";

export const API_URL = "http://localhost:5000";

export async function loadAllProducts(
  page: number,
  search: string
): Promise<ProductsData> {
  const url = `${API_URL}/api/product?page=${page}${
    search && `&search=${search}`
  }&status=open`;
  const response = await axios.get<ProductsData>(url);
  return ProductAdapter.transformArray(response.data);
}

export async function loadUserProducts(
  id: number,
  filter: "current" | "closed" | "taken",
  page: string
): Promise<ProductsProfileData> {
  const url = `${API_URL}/api/product_user/${id}?page=${page}&filter=${filter}`;
  const response = await axios.get<IProductProfile[]>(url);
  return ProductAdapter.transformProfileProductArray(response.data);
}

export async function loadOneProduct(productId: string): Promise<IProduct> {
  const response = await axios.get<IProduct>(
    `${API_URL}/api/product/${productId}`
  );
  return ProductAdapter.transform(response.data);
}

export async function loadUserTotalProducts(
  productId: number
): Promise<{ count: string }> {
  const response = await axios.get<{ count: string }>(
    `${API_URL}/api/product_created/${productId}`
  );
  return response.data;
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
  const token = localStorage.getItem("token");
  axios.post(`${API_URL}/api/product`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function updateProductStatus(
  productId: number,
  status: "open" | "reserved" | "closed"
): Promise<IProductStatusInfo> {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/api/product_status`,
    {
      id: productId,
      status,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return ProductAdapter.transformUpdatedStatus(response.data);
}
