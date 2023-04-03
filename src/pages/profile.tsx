import Layout from "@/components/layout/Layout";
import ProfileScreen from "@/components/screens/profile/Profile";

export default function Profile() {
  return (
    <Layout
      pageTitle="Profile"
      pageDescription="Create your profile, Connect, share, and make world a better place."
    >
      <ProfileScreen />
    </Layout>
  );
}
