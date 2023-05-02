import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { loadUserProducts } from "@/api/ProductApi";
import { ProfileProductCard } from "./ProfileProductCard/ProfileProductCard";
import { useRouter } from "next/router";
import { Paginator } from "../../../common/paginator/Paginator";
import { ProductsProfileData } from "@/api/ProductAdapter";
import { ProfileProductFilterType } from "@/models/Product";

type ProfileProductsProps = {
  userId: number;
  queryAds: ProfileProductFilterType | undefined;
  queryPage: string | undefined;
};

export const ProfileProducts = ({
  userId,
  queryAds,
  queryPage,
}: ProfileProductsProps) => {
  const router = useRouter();

  const [products, setProducts] = useState<ProductsProfileData>(
    {} as ProductsProfileData
  );

  const onAdsClick = (filter: ProfileProductFilterType) => {
    if (filter === "current") {
      // When ads = "" remove query from url
      const { ads, ...routerQuery } = router.query;
      router.replace({
        query: { ...routerQuery, page: 1 },
      });
    } else {
      router.replace({
        query: { ...router.query, ads: filter, page: 1 },
      });
    }
  };

  const fetchProducts = useCallback(
    async (filter: ProfileProductFilterType | undefined) => {
      if (filter) {
        const newProducts: ProductsProfileData = await loadUserProducts(
          userId,
          filter,
          queryPage ? queryPage.toString() : ""
        );
        setProducts(newProducts);
      }
    },
    [router.query, userId]
  );

  useEffect(() => {
    if (!router.isReady) return;
    fetchProducts(queryAds);
  }, [router.isReady, queryAds, fetchProducts]);

  return (
    <div>
      <ProductsHeader activeItem={router.isReady ? queryAds : undefined}>
        <HeaderEl
          active={queryAds === "current"}
          onClick={() => onAdsClick("current")}
        >
          Текущие объявления
        </HeaderEl>
        <HeaderEl
          active={queryAds === "closed"}
          onClick={() => onAdsClick("closed")}
        >
          Отдано
        </HeaderEl>
        <HeaderEl
          active={queryAds === "taken"}
          onClick={() => onAdsClick("taken")}
        >
          Забронировано
        </HeaderEl>
      </ProductsHeader>
      <ProductsBlock>
        <ProductsContainer>
          {products.products?.map((product, index) => (
            <ProfileProductCard key={index} product={product} />
          ))}
        </ProductsContainer>
        <Paginator
          currentPage={Number(queryPage)}
          totalItems={products.totalCount}
          itemsPerPage={8}
        />
      </ProductsBlock>
    </div>
  );
};

type ProductsHeaderProps = {
  activeItem?: ProfileProductFilterType | undefined;
};

const ProductsHeader = styled.div<ProductsHeaderProps>`
  display: flex;
  align-items: end;
  div:nth-child(1) {
    border-radius: ${(props) =>
      props.activeItem === "current" ? "11px 11px 0 0" : "11px 0 0 0"};
  }
  div:nth-child(2) {
    border-radius: ${(props) =>
      props.activeItem === "closed" && "11px 11px 0 0"};
    border-left-style: none;
    border-right-style: none;
  }
  div:nth-last-child(1) {
    border-radius: ${(props) =>
      props.activeItem === "taken" ? "11px 11px 0 0" : "0 11px 0 0"};
  }
  & > div:hover {
    border-radius: 11px 11px 0 0;
  }
`;

type HeaderElProps = {
  active?: boolean;
};

const HeaderEl = styled.div<HeaderElProps>`
  border: 2px solid ${COLORS.mainColor};
  border-bottom-style: none;
  padding: ${(props) => (props.active ? "10px 5px" : "5px")};
  background-color: ${(props) =>
    props.active ? COLORS.mainColor : "transparent"};
  color: ${(props) => (props.active ? COLORS.white : COLORS.mainColor)};
  flex: 1;
  height: min-content;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    padding: ${(props) => (props.active ? "10px 5px" : "5px 5px 10px")};
    background-color: ${(props) =>
      props.active ? COLORS.mainColor : COLORS.mainHoverLight};
    border-color: ${(props) =>
      props.active ? COLORS.mainColor : COLORS.mainHoverLight};
    color: ${COLORS.white};
  }
`;

const ProductsBlock = styled.div`
  border: 2px solid ${COLORS.mainColor};
  border-radius: 0 0 11px 11px;
  min-height: 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;
