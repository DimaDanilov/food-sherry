import { loadOneProduct, loadProducts } from "@/api/ProductApi";
import { Layout } from "@/components/layout/Layout";
import { ProductScreen } from "@/components/screens/product/Product";
import { ProductModel } from "@/models/Product";

type ProductProps = {
  product: ProductModel;
};

export default function Product({ product }: ProductProps) {
  return (
    <Layout
      pageTitle={product.title}
      pageDescription="Eat well, waste less, and save more food with foodsharing."
    >
      <ProductScreen product={product} />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const data = await loadProducts();
    const paths = data.products?.map((product) => ({
      params: { productId: product.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (e) {
    console.error(e);
    return { paths: [], fallback: false };
  }
}

type GetStaticPropsProps = {
  params: {
    productId: string;
  };
};

export async function getStaticProps({ params }: GetStaticPropsProps) {
  try {
    const product = await loadOneProduct(params.productId);
    return {
      props: {
        product,
      },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
}
