import { Container } from "@/ui/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { ProfileInfo } from "./profile-sections/ProfileInfo";
import { useAuthStore } from "@/store/AuthStore";

export default function ProfileScreen() {
  const authStore = useAuthStore();
  return (
    <PageContainer>
      <ProfileInfoContainer>
        <ProfileInfo />
      </ProfileInfoContainer>
      <ProfileProductsContainer>
        <ProfileProducts />
      </ProfileProductsContainer>
    </PageContainer>
  );
}

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ProfileInfoContainer = styled.div`
  width: 25%;
`;
const ProfileProductsContainer = styled.div`
  width: 65%;
`;
