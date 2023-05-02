import axios from "axios";
import {
  IProduct,
  IProductProfile,
  IProductStatusInfo,
  ProductProfileFilter,
  ProductStatus,
} from "@/models/Product";
import {
  ProductAdapter,
  ProductsData,
  ProductsProfileData,
} from "./ProductAdapter";

export const API_URL = "http://localhost:5000";

export async function loadProducts(
  page?: number,
  search?: string,
  sort?: string,
  categories?: string[],
  status?: ProductStatus
): Promise<ProductsData> {
  const response = await axios.get<ProductsData>(`${API_URL}/api/product`, {
    params: { page, search, sort, status, categories },
  });
  return ProductAdapter.transformArray(response.data);
}

export async function loadUserProducts(
  id: number,
  filter: ProductProfileFilter,
  page: string
): Promise<ProductsProfileData> {
  const response = await axios.get<IProductProfile[]>(
    `${API_URL}/api/product_user/${id}`,
    { params: { page, filter } }
  );
  return ProductAdapter.transformProfileProductArray(response.data);
}

export async function loadOneProduct(productId: string): Promise<IProduct> {
  const response = await axios.get<IProduct>(
    `${API_URL}/api/product/${productId}`
  );
  return ProductAdapter.transform(response.data);
}

export async function loadUserTotalProducts(
  productId: string
): Promise<number> {
  const response = await axios.get<number>(
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
  status: ProductStatus
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
  return ProductAdapter.transformUpdatedStatus(response.data[1]);
}
