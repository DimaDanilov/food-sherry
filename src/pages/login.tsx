import Layout from "@/components/layout/Layout";
import LoginScreen from "@/components/screens/login/Login";

export default function Login() {
  return (
    <Layout
      pageTitle="Login"
      pageDescription="Log in to your account to customize your experience, save food and make world better."
    >
      <LoginScreen />
    </Layout>
  );
}
