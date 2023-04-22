import { loadUserTotalProducts } from "@/api/ProductApi";
import { IUser } from "@/models/User";
import { COLORS } from "@/styles/globalStyles";
import { HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const ProfileInfo = ({ user }: { user: IUser }) => {
  const [userProductAmount, setUserProductAmount] = useState<string>("");

  useEffect(() => {
    async function fetchUserProductAmount() {
      const productInfo = await loadUserTotalProducts(user.id);
      setUserProductAmount(productInfo.count);
    }
    fetchUserProductAmount();
  }, [user.id]);

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
      <InfoDetails>Помогает с: N даты</InfoDetails>
      <InfoDetails>Создал объявлений: {userProductAmount}</InfoDetails>
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
const InfoDetails = styled.h4`
  color: ${COLORS.mainColor};
`;
