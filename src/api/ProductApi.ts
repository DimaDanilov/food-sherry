import axios from "axios";
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

export async function loadProducts(
  page?: number,
  search?: string,
  sort?: string,
  categories?: string[],
  status?: ProductStatusType
): Promise<ProductsData> {
  const response = await axios.get<ProductsData>(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product`,
    {
      params: { page, search, sort, status, categories },
    }
  );
  return ProductAdapter.transformArray(response.data);
}

export async function loadUserProducts(
  id: number,
  filter: ProfileProductFilterType,
  page: string
): Promise<ProductsProfileData> {
  try {
    const response = await axios.get<ProfileProductModel[]>(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product_user/${id}`,
      { params: { page, filter } }
    );
    return ProductAdapter.transformProfileProductArray(response.data);
  } catch (e) {
    console.error(e);
    return {} as ProductsProfileData;
  }
}

export async function loadOneProduct(productId: string): Promise<ProductModel> {
  const response = await axios.get<ProductModel>(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product/${productId}`
  );
  return ProductAdapter.transform(response.data);
}

export async function loadUserTotalProducts(
  productId: string
): Promise<number> {
  const response = await axios.get<number>(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product_created/${productId}`
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
  await axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product`,
    formData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function updateProduct(
  productId: number,
  description: string,
  amount: string,
  location: string
) {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product`,
    {
      id: productId,
      description,
      amount,
      location,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function updateProductStatus(
  productId: number,
  status: ProductStatusType
): Promise<ProductStatusModel> {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/product_status`,
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
