import { loadUserTotalProducts } from "@/api/ProductApi";
import { loadOneUser, loadUsers } from "@/api/UserApi";
import { Layout } from "@/components/layout/Layout";
import { ProfileScreen } from "@/components/screens/profile/Profile";
import { UserModel } from "@/models/User";

type ProfileProps = {
  user: UserModel;
  totalProducts: number;
};

export default function Profile({ user, totalProducts }: ProfileProps) {
  return (
    <Layout
      pageTitle="Profile"
      pageDescription="Create your profile, Connect, share, and make world a better place."
    >
      <ProfileScreen user={user} totalProducts={totalProducts} />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const data = await loadUsers();
    const paths = data.users?.map((user) => ({
      params: { userId: user.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (e) {
    console.error(e);
    return { paths: [], fallback: false };
  }
}

type GetStaticPropsProps = {
  params: {
    userId: string;
  };
};

export async function getStaticProps({ params }: GetStaticPropsProps) {
  let user: UserModel;
  try {
    user = await loadOneUser(params.userId);
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }

  let totalProducts: number | null;
  try {
    totalProducts = await loadUserTotalProducts(params.userId);
  } catch (e) {
    console.error(e);
    totalProducts = null;
  }

  return {
    props: {
      user,
      totalProducts,
    },
    revalidate: 5,
  };
}
