import Paginator from "./paginator/Paginator";
import { COLORS } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import SearchInput from "@/ui/SearchInput";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import FoodCard from "../../common/FoodCard";
import { ProductsData } from "@/pages/api/FoodAdapter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SaveFoodScreen({
  productsData,
  page,
  search,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
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
          query: { ...router.query, search: searchField },
        });
      } else {
        const { search, ...routerQuery } = router.query;
        router.replace({
          query: { ...routerQuery },
        });
      }
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
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
      <CardsContainer>
        {productsData.products?.map((p) => (
          <FoodCard key={p.id} food={p} />
        ))}
      </CardsContainer>
      <Paginator totalItems={productsData.totalCount} currentPage={page} />
    </Container>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 3% 0;
  gap: 10vh 6vh;
`;
