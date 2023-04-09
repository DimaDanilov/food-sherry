import Paginator from "./paginator/Paginator";
import { COLORS } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import SearchInput from "@/ui/SearchInput";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import FoodCard from "../../common/FoodCard";
import { ProductsData } from "@/pages/api/FoodAdapter";

export default function SaveFoodScreen({
  productsData,
  page,
}: {
  productsData: ProductsData;
  page: number;
}) {
  return (
    <Container>
      <SearchInput
        type="text"
        name="food_search"
        icon={<HiOutlineMagnifyingGlass color={COLORS.gray} />}
        iconScale={1.3}
      />
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
