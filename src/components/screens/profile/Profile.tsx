import { Container } from "@/ui/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { ProfileInfo } from "./profile-sections/ProfileInfo";

export default function ProfileScreen() {
  return (
    <ProfileContainer>
      <ProfileInfoContainer>
        <ProfileInfo />
      </ProfileInfoContainer>

      <ProfileProductsContainer>
        <ProfileProducts />
      </ProfileProductsContainer>
    </ProfileContainer>
  );
}

const ProfileContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ProfileInfoContainer = styled.div`
  width: 30%;
`;
const ProfileProductsContainer = styled.div`
  width: 60%;
`;
