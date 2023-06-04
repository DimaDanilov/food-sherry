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

type getServerSidePropsProps = {
  params: {
    userId: string;
  };
};

export async function getServerSideProps({ params }: getServerSidePropsProps) {
  const userId = params.userId;

  let user: UserModel;
  try {
    user = await loadOneUser(userId);
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }

  let totalProducts: number | null;
  try {
    totalProducts = await loadUserTotalProducts(userId);
  } catch (e) {
    console.error(e);
    totalProducts = null;
  }

  return {
    props: {
      user,
      totalProducts,
    },
  };
}
