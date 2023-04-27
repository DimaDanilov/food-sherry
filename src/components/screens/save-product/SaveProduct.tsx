import Paginator from "../../common/paginator/Paginator";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import SearchInput from "@/ui/SearchInput";
import {
  HiArrowLongDown,
  HiArrowLongUp,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import styled from "styled-components";
import ProductCard from "./ProductCard/ProductCard";
import { ProductsData } from "@/api/ProductAdapter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductSort } from "@/models/Product";

export default function SaveProductScreen({
  productsData,
  page,
  search,
  sort,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
  sort: ProductSort;
}) {
  const router = useRouter();

  const [searchField, setSearchField] = useState<string>("");

  useEffect(() => {
    setSearchField(search);
  }, [search]);

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchField !== search) {
      if (searchField) {
        router.replace({
          query: { ...router.query, page: 1, search: searchField },
        });
      } else {
        const { search, ...routerQuery } = router.query;
        router.replace({
          query: { ...routerQuery, page: 1 },
        });
      }
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const onFilterClick = (sort: ProductSort) => {
    if (ProductSort[sort].toString() === ProductSort.datedown.toString()) {
      router.replace({
        query: { ...router.query, sort: "dateup" },
      });
    } else {
      router.replace({
        query: { ...router.query, sort: "datedown" },
      });
    }
  };

  return (
    <Container>
      <form action="" onSubmit={onSearchSubmit}>
        <SearchInput
          type="text"
          name="food_search"
          searchValue={searchField}
          searchOnChange={onSearchChange}
          icon={<HiOutlineMagnifyingGlass color={COLORS.gray} />}
          iconScale={1.3}
        />
      </form>
      <span>Сортировать по:</span>
      <SortBtn onClick={() => onFilterClick(sort)}>
        {ProductSort[sort].toString() === ProductSort.datedown.toString() && (
          <HiArrowLongDown size={16} />
        )}
        {ProductSort[sort].toString() === ProductSort.dateup.toString() && (
          <HiArrowLongUp size={16} />
        )}
        <span>Дате</span>
      </SortBtn>
      <CardsContainer>
        {productsData.products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </CardsContainer>
      <Paginator
        totalItems={productsData.totalCount}
        currentPage={page}
        itemsPerPage={12}
      />
    </Container>
  );
}

const CardsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 10vh 6vh;
`;
const SortBtn = styled.button`
  cursor: pointer;
  transition: 0.3s;
  margin: 1.5% 0;
  background-color: transparent;
  color: ${COLORS.mainColor};
  border: 0;
  padding: 0 5px;
  &:hover {
    color: ${COLORS.mainHoverLight};
  }
`;
