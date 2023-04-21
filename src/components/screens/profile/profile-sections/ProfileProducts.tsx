import { IProductProfile } from "@/models/Product";
import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { useEffect, useState, useMemo, useCallback } from "react";
import { loadUserProducts } from "@/api/ProductApi";
import { ProfileProductCard } from "./ProfileProductCard";

export const ProfileProducts = ({ userId }: { userId: number }) => {
  const [productsFilter, setProductsFilter] = useState<string>("current");

  const [currentProducts, setCurrentProducts] = useState<IProductProfile[]>([]);
  const [closedProducts, setClosedProducts] = useState<IProductProfile[]>([]);
  const [takenProducts, setTakenProducts] = useState<IProductProfile[]>([]);

  const [isCurrentLoaded, setIsCurrentLoaded] = useState<boolean>(false);
  const [isClosedLoaded, setIsClosedLoaded] = useState<boolean>(false);
  const [isTakenLoaded, setIsTakenLoaded] = useState<boolean>(false);

  const currentProductsItems = useMemo(
    () =>
      currentProducts.map((product) => (
        <ProfileProductCard product={product} />
      )),
    [currentProducts]
  );

  const closedProductsItems = useMemo(
    () =>
      closedProducts.map((product) => <ProfileProductCard product={product} />),
    [closedProducts]
  );

  const takenProductsItems = useMemo(
    () =>
      takenProducts.map((product) => <ProfileProductCard product={product} />),
    [takenProducts]
  );

  const onFilterChange = (filter: string) => {
    setProductsFilter(filter);
  };

  const fetchProducts = useCallback(
    async (filter: string) => {
      if (filter === "current" && !isCurrentLoaded) {
        const newProducts: IProductProfile[] = await loadUserProducts(
          userId,
          "current"
        );
        setIsCurrentLoaded(true);
        setCurrentProducts(newProducts);
      }
      if (filter === "closed" && !isClosedLoaded) {
        const newProducts: IProductProfile[] = await loadUserProducts(
          userId,
          "closed"
        );
        setIsClosedLoaded(true);
        setClosedProducts(newProducts);
      }
      if (filter === "taken" && !isTakenLoaded) {
        const newProducts: IProductProfile[] = await loadUserProducts(
          userId,
          "taken"
        );
        setIsTakenLoaded(true);
        setTakenProducts(newProducts);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchProducts(productsFilter);
  }, [productsFilter]);

  return (
    <div>
      <ProductsHeader activeItem={productsFilter}>
        <HeaderEl
          active={productsFilter === "current"}
          onClick={() => onFilterChange("current")}
        >
          Текущие объявления
        </HeaderEl>
        <HeaderEl
          active={productsFilter === "closed"}
          onClick={() => onFilterChange("closed")}
        >
          Отдано
        </HeaderEl>
        <HeaderEl
          active={productsFilter === "taken"}
          onClick={() => onFilterChange("taken")}
        >
          Забронировано
        </HeaderEl>
      </ProductsHeader>
      <ProductsContainer>
        {productsFilter === "current" && currentProductsItems}
        {productsFilter === "closed" && closedProductsItems}
        {productsFilter === "taken" && takenProductsItems}
      </ProductsContainer>
    </div>
  );
};

const ProductsHeader = styled.div<{ activeItem?: string | undefined }>`
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
