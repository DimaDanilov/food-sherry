import { loadUserTotalProducts } from "@/api/ProductApi";
import { loadOneUser } from "@/api/UserApi";
import Layout from "@/components/layout/Layout";
import ProfileScreen from "@/components/screens/profile/Profile";
import { IUser } from "@/models/User";
import axios from "axios";

interface ProfileProps {
  user: IUser;
  totalProducts: number;
}

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
    const response = await axios.get<IUser[]>("http://localhost:5000/api/user");

    const paths = response.data.map((user) => ({
      params: { userId: user.id.toString() },
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
    userId: string;
  };
}) {
  const user = await loadOneUser(params.userId);
  const totalProducts = await loadUserTotalProducts(params.userId);
  return {
    props: {
      user,
      totalProducts,
    },
  };
}
