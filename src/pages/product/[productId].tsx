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

type getServerSidePropsProps = {
  params: {
    productId: string;
  };
};

export async function getServerSideProps({ params }: getServerSidePropsProps) {
  const productId = params.productId;

  try {
    const product = await loadOneProduct(productId);
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
