import Paginator from "@/components/common/paginator/Paginator";
import FoodCard from "@/components/save-food/FoodCard";
import { foodArray } from "@/fake-data/foodArray";
import { FoodItem } from "@/models/FoodItem";
import { Container } from "@/ui/Container";
import PageTemplate from "@/ui/PageTemplate";
import SearchInput from "@/ui/SearchInput";
import styled from "styled-components";

export default function SaveFood() {
  const foodItems: FoodItem[] = foodArray;

  const foodCards = foodItems.map((f) => {
    return <FoodCard key={f.id} food={f} />;
  });

  return (
    <PageTemplate>
      <Container>
        <SearchInput type="text" name="food_search" icon="/icons/search.svg" />
        <CardsContainer>{foodCards}</CardsContainer>
        <Paginator totalItems={100} currentPage={1} />
      </Container>
    </PageTemplate>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 3% 0;
  gap: 10vh 6vh;
`;
