import { FoodAdapter } from "./FoodAdapter";

export async function loadAllProducts(page: number, search: string) {
  let res: Response;
  if (search) {
    res = await fetch(
      `http://localhost:5000/api/product?page=${page}&search=${search}`
    );
  } else {
    res = await fetch(`http://localhost:5000/api/product?page=${page}`);
  }
  const data = await res.json();
  const transformedData = FoodAdapter.transform(data);

  return transformedData;
}
