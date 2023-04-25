import { loadOneProduct, loadProducts } from "@/api/ProductApi";
import Layout from "@/components/layout/Layout";
import { ProductScreen } from "@/components/screens/product/Product";
import { IProduct } from "@/models/Product";

export default function Product({ product }: { product: IProduct }) {
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

    const paths = data.products.map((product) => ({
      params: { productId: product.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getStaticProps({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const product = await loadOneProduct(params.productId);
  return {
    props: {
      product,
    },
  };
}
