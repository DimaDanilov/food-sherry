import Layout from "@/components/layout/Layout";
import { RegisterCompanyScreen } from "@/components/screens/register-company/RegisterCompany";

export default function RegisterCompany() {
  return (
    <Layout
      pageTitle="Register"
      pageDescription="Connect with companies who care about reducing food waste and making a difference. Register with our foodsharing website today."
    >
      <RegisterCompanyScreen />
    </Layout>
  );
}
