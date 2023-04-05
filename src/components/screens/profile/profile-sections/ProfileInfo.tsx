import { userFakeData } from "@/fake-data/userData";
import { IUserData } from "@/models/UserData";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import { HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";

export const ProfileInfo = () => {
  const userData: IUserData = userFakeData;

  return (
    <div>
      <ProfileBriefData>
        <HiUserCircle fontSize={200} width="10px" color={COLORS.mainColor} />
        <Title>
          {userData.name} {userData.surname}
        </Title>
      </ProfileBriefData>
      <InfoDetails>Помогает с {userData.registrationDate}</InfoDetails>
      <InfoDetails>Создал объявлений: {userData.adsCreated}</InfoDetails>
      <InfoDetails>Забрал еды: {userData.adsTaken}</InfoDetails>
    </div>
  );
};

const ProfileBriefData = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  text-align: center;
`;
const Title = styled.h1`
  font-size: ${FONT_SIZE.h1};
  color: ${COLORS.mainColor};
`;
const InfoDetails = styled.h3`
  font-size: ${FONT_SIZE.h3};
  color: ${COLORS.mainColor};
`;
