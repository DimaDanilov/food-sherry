import FoodCard from "@/components/common/FoodCard";
import { foodFakeArray } from "@/fake-data/foodArray";
import { FoodItem } from "@/models/FoodItem";
import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const ProfileProducts = () => {
  const router = useRouter();
  const [productsFilter, setProductsFilter] = useState<string | undefined>(
    undefined
  );

  const productsData: Array<FoodItem> = foodFakeArray;
  const productsItems = productsData.map((product) => (
    <FoodCard key={product.id} food={product} />
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
    <div>
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
    </div>
  );
};

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
