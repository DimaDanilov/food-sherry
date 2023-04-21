import { Container } from "@/ui/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { ProfileInfo } from "./profile-sections/ProfileInfo";
import { IUser } from "@/models/User";

export default function ProfileScreen({ user }: { user: IUser }) {
  return (
    <PageContainer>
      <ProfileInfoContainer>
        <ProfileInfo user={user} />
      </ProfileInfoContainer>
      <ProfileProductsContainer>
        <ProfileProducts userId={user.id} />
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
