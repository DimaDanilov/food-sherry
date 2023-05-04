import {
  ProductModel,
  ProfileProductModel,
  ProductStatusModel,
  ProfileProductFilterType,
  ProductStatusType,
} from "@/models/Product";
import {
  ProductAdapter,
  ProductsData,
  ProductsProfileData,
} from "./ProductAdapter";
import { axiosAuth, axiosBase } from ".";

export async function loadProducts(
  page?: number,
  search?: string,
  sort?: string,
  categories?: string[],
  status?: ProductStatusType
): Promise<ProductsData> {
  const response = await axiosBase.get<ProductsData>(`api/product`, {
    params: { page, search, sort, status, categories },
  });
  return ProductAdapter.transformArray(response.data);
}

export async function loadOneProduct(productId: string): Promise<ProductModel> {
  const response = await axiosBase.get<ProductModel>(
    `api/product/${productId}`
  );
  return ProductAdapter.transform(response.data);
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
  await axiosAuth.post(`api/product`, formData);
}

export async function updateProduct(
  productId: number,
  description: string,
  amount: string,
  location: string
) {
  const response = await axiosAuth.put(`api/product`, {
    id: productId,
    description,
    amount,
    location,
  });
  return response.data;
}

export async function loadUserProducts(
  id: number,
  filter: ProfileProductFilterType,
  page: string
): Promise<ProductsProfileData> {
  try {
    const response = await axiosBase.get<ProfileProductModel[]>(
      `api/product/user_products/${id}`,
      { params: { page, filter } }
    );
    return ProductAdapter.transformProfileProductArray(response.data);
  } catch (e) {
    console.error(e);
    return {} as ProductsProfileData;
  }
}

export async function loadUserTotalProducts(
  productId: string
): Promise<number> {
  const response = await axiosBase.get<number>(
    `api/product/user_products_total/${productId}`
  );
  return response.data;
}

export async function updateProductStatus(
  productId: number,
  status: ProductStatusType
): Promise<ProductStatusModel> {
  const response = await axiosAuth.put(`api/product/status`, {
    id: productId,
    status,
  });
  return ProductAdapter.transformUpdatedStatus(response.data[1]);
}
