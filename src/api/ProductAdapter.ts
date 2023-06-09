import {
  ProductModel,
  ProfileProductModel,
  ProductStatusModel,
  ProductShortModel,
} from "@/models/Product";

export interface ProductsShortData {
  products: ProductShortModel[];
  totalCount: number;
}
export interface ProductsProfileData {
  products: ProfileProductModel[];
  totalCount: number;
}

export class ProductAdapter {
  static transform(productItem: any): ProductModel {
    return {
      id: productItem.id,
      title: productItem.title,
      author: {
        id: productItem.author.id,
        name: productItem.author.name,
        surname: productItem.author.surname,
        companyName: productItem.author.company_name,
        email: productItem.author.email,
        phone: productItem.author.phone,
        avatar: productItem.author.avatar,
        timeCreated: productItem.author.time_created,
      },
      clientId: productItem.client_id,
      category: productItem.category,
      description: productItem.description,
      amount: productItem.amount,
      timeCreated: productItem.time_created,
      timeToTake: productItem.time_to_take,
      location: productItem.location,
      imagesSrc: productItem.images,
      status: productItem.status,
    };
  }
  static transformShort(productItem: any): ProductShortModel {
    return {
      id: productItem.id,
      title: productItem.title,
      author: {
        id: productItem.author.id,
        name: productItem.author.name,
        surname: productItem.author.surname,
        companyName: productItem.author.company_name,
        email: productItem.author.email,
        phone: productItem.author.phone,
        avatar: productItem.author.avatar,
        timeCreated: productItem.author.time_created,
      },
      timeToTake: productItem.time_to_take,
      location: productItem.location,
      imagesSrc: productItem.images,
    };
  }
  static transformShortArray(data: any): ProductsShortData {
    return {
      products: data.rows.map((item: any) => this.transformShort(item)),
      totalCount: data.count,
    };
  }
  static transformUpdatedStatus(newStatusInfo: any): ProductStatusModel {
    return {
      id: newStatusInfo.id,
      clientId: newStatusInfo.client_id,
      status: newStatusInfo.status,
    };
  }
  static transformProfileProduct(product: any): ProfileProductModel {
    return {
      id: product.id,
      title: product.title,
      imagesSrc: product.images,
      status: product.status,
    };
  }
  static transformProfileProductArray(data: any): ProductsProfileData {
    return {
      products: data.rows?.map((item: any) =>
        this.transformProfileProduct(item)
      ),
      totalCount: data.count,
    };
  }
}
