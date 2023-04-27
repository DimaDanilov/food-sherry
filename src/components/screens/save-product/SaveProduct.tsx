import Paginator from "../../common/paginator/Paginator";
import { COLORS } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import SearchInput from "@/ui/SearchInput";
import {
  HiAdjustmentsHorizontal,
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
import { ICategory } from "@/models/Category";
import FilterWindow from "./FilterWindow/FilterWindow";

export default function SaveProductScreen({
  productsData,
  page,
  search,
  sort,
  availableCategories,
  categoriesQuery,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
  sort: ProductSort;
  availableCategories: ICategory[];
  categoriesQuery: string[];
}) {
  const router = useRouter();

  const [searchField, setSearchField] = useState<string>("");
  const [filterWindowActive, setFilterWindowActive] = useState<boolean>(false);

  useEffect(() => {
    setSearchField(search);
  }, [search]);

  useEffect(() => {
    setFilterWindowActive(false);
  }, [categoriesQuery]);

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

  const onSortClick = (sort: ProductSort) => {
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
      <FilterSortContainer>
        <span>
          <span>Сортировать по:</span>
          <SortBtn onClick={() => onSortClick(sort)}>
            {ProductSort[sort].toString() ===
              ProductSort.datedown.toString() && <HiArrowLongDown size={16} />}
            {ProductSort[sort].toString() === ProductSort.dateup.toString() && (
              <HiArrowLongUp size={16} />
            )}
            <span>Дате</span>
          </SortBtn>
        </span>

        <FilterContainer>
          <FilterBtn
            onClick={() => setFilterWindowActive(!filterWindowActive)}
            active={filterWindowActive}
          >
            <HiAdjustmentsHorizontal
              size={16}
              style={{
                scale: "1.7",
              }}
            />
          </FilterBtn>
          <FilterWindowContainer>
            <FilterWindow
              availableCategories={availableCategories}
              categoriesQuery={categoriesQuery}
              isActive={filterWindowActive}
            />
          </FilterWindowContainer>
        </FilterContainer>
      </FilterSortContainer>
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
  background-color: transparent;
  color: ${COLORS.mainColor};
  border: 0;
  padding: 0 5px;
  &:hover {
    color: ${COLORS.mainHoverLight};
  }
`;
const FilterBtn = styled.button<{ active: boolean }>`
  transition: 0.3s;
  color: ${(props) => (props.active ? COLORS.white : COLORS.mainColor)};
  border: 1px solid;
  border-radius: 10px;
  border-color: ${(props) =>
    props.active ? COLORS.mainHoverLight : "transparent"};
  background-color: ${(props) =>
    props.active ? COLORS.mainHoverLight : "transparent"};
  padding: 8px 11px;
  cursor: pointer;
  &:hover {
    color: ${COLORS.white};
    background-color: ${COLORS.mainHoverLight};
    border-color: ${COLORS.mainHoverLight};
  }
`;
const FilterSortContainer = styled.div`
  display: flex;
  margin: 1.5% 0;
  justify-content: space-between;
  align-items: center;
`;
const FilterContainer = styled.span`
  position: relative;
`;
const FilterWindowContainer = styled.span`
  position: absolute;
  overflow: hidden;
  top: 45px;
  right: 0px;
`;
