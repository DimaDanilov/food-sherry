import { IUser } from "@/models/User";
import { COLORS } from "@/styles/globalStyles";
import { HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";

interface ProfileScreenProps {
  user: IUser;
  totalProducts: number;
}

export const ProfileInfo = ({ user, totalProducts }: ProfileScreenProps) => {
  return (
    <div>
      <ProfileBriefData>
        <HiUserCircle fontSize={200} width="10px" color={COLORS.mainColor} />
        <Title>
          {user.name} {user.surname} {user.companyName}
        </Title>
      </ProfileBriefData>
      <InfoDetails>Телефон: {user.phone}</InfoDetails>
      <InfoDetails>Почта: {user.email}</InfoDetails>
      {user.timeCreated && (
        <InfoDetails>
          Помогает с: {new Date(user.timeCreated).toLocaleDateString()}
        </InfoDetails>
      )}
      {!Number.isNaN(totalProducts) && (
        <InfoDetails>Создал объявлений: {totalProducts}</InfoDetails>
      )}
    </div>
  );
};

const ProfileBriefData = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  text-align: center;
`;
const Title = styled.h1`
  color: ${COLORS.mainColor};
`;
const InfoDetails = styled.h5`
  color: ${COLORS.mainColor};
  margin: 5px auto;
`;
