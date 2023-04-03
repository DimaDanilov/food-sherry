import { userFakeData } from "@/fake-data/userData";
import { IUserData } from "@/models/UserData";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import { useRouter } from "next/router";
import { HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FoodCard from "../../common/FoodCard";
import { foodFakeArray } from "@/fake-data/foodArray";
import { FoodItem } from "@/models/FoodItem";

export default function ProfileScreen() {
  const router = useRouter();
  const userData: IUserData = userFakeData;
  const [productsFilter, setProductsFilter] = useState<string | undefined>(
    undefined
  );

  const productsData: Array<FoodItem> = foodFakeArray;
  const productsItems = productsData.map((product) => (
    <FoodCard key={product.id} food={product} titleFontSize={FONT_SIZE.h3} />
  ));

  useEffect(() => {
    if (!router.isReady) return;
    const ads = router.query.ads;
    if (ads === "given" || ads === "taken") {
      setProductsFilter(ads);
    } else {
      setProductsFilter("open");
    }
  }, [router.isReady, router.query]);

  const handleClick = (query: string) => {
    router.push(
      query
        ? {
            pathname: "/profile",
            query: { ads: query },
          }
        : "/profile"
    );
  };

  return (
    <ProfileContainer>
      <ProfileInfo>
        <ProfileBriefData>
          <HiUserCircle fontSize={200} width="10px" color={COLORS.mainColor} />
          <Title>
            {userData.name} {userData.surname}
          </Title>
        </ProfileBriefData>
        <InfoDetails>Помогает с {userData.registrationDate}</InfoDetails>
        <InfoDetails>Создал объявлений: {userData.adsCreated}</InfoDetails>
        <InfoDetails>Забрал еды: {userData.adsTaken}</InfoDetails>
      </ProfileInfo>

      <ProductsTable>
        <ProductsHeader activeItem={productsFilter}>
          <HeaderEl
            active={productsFilter === "open"}
            onClick={() => handleClick("")}
          >
            Текущие объявления
          </HeaderEl>
          <HeaderEl
            active={productsFilter === "given"}
            onClick={() => handleClick("given")}
          >
            Отдано
          </HeaderEl>
          <HeaderEl
            active={productsFilter === "taken"}
            onClick={() => handleClick("taken")}
          >
            Забрано
          </HeaderEl>
        </ProductsHeader>
        <ProductsContainer>{productsItems}</ProductsContainer>
      </ProductsTable>
    </ProfileContainer>
  );
}

const ProfileContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ProfileInfo = styled.div`
  width: 30%;
  color: ${COLORS.mainColor};
`;
const ProfileBriefData = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  text-align: center;
`;
const Title = styled.h1`
  font-size: ${FONT_SIZE.h1};
`;
const ProductsTable = styled.div`
  width: 60%;
`;
const InfoDetails = styled.h3`
  font-size: ${FONT_SIZE.h3};
  font-weight: ${FONT_WEIGHT.h3};
`;

const ProductsHeader = styled.div<{ activeItem?: string | undefined }>`
  display: flex;
  align-items: end;
  div:nth-child(1) {
    border-radius: ${(props) =>
      props.activeItem === "open" ? "11px 11px 0 0" : "11px 0 0 0"};
  }
  div:nth-child(2) {
    border-radius: ${(props) =>
      props.activeItem === "given" && "11px 11px 0 0"};
    border-left-style: none;
    border-right-style: none;
  }
  div:nth-last-child(1) {
    border-radius: ${(props) =>
      props.activeItem === "taken" ? "11px 11px 0 0" : "0 11px 0 0"};
  }
`;
const HeaderEl = styled.div<{ active?: boolean }>`
  border: 2px solid ${COLORS.mainColor};
  border-bottom-style: none;
  padding: ${(props) => (props.active ? "10px 5px" : "5px")};
  background-color: ${(props) =>
    props.active ? COLORS.mainColor : "transparent"};
  color: ${(props) => (props.active ? COLORS.white : COLORS.mainColor)};
  flex: 1;
  height: min-content;
  text-align: center;
  cursor: pointer;
`;
const ProductsContainer = styled.div`
  border: 2px solid ${COLORS.mainColor};
  border-radius: 0 0 11px 11px;
  min-height: 150px;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
