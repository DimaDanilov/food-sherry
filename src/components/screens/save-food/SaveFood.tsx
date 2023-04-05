import Paginator from "./paginator/Paginator";
import { foodFakeArray } from "@/fake-data/foodArray";
import { FoodItem } from "@/models/FoodItem";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import { Container } from "@/ui/Container";
import SearchInput from "@/ui/SearchInput";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import FoodCard from "../../common/FoodCard";

export default function SaveFoodScreen() {
  const foodItems: FoodItem[] = foodFakeArray;

  const foodCards = foodItems.map((f) => {
    return <FoodCard key={f.id} food={f} />;
  });

  return (
    <Container>
      <SearchInput
        type="text"
        name="food_search"
        icon={<HiOutlineMagnifyingGlass color={COLORS.gray} />}
        iconScale={1.3}
      />
      <CardsContainer>{foodCards}</CardsContainer>
      <Paginator totalItems={100} currentPage={1} />
    </Container>
  );
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 3% 0;
  gap: 10vh 6vh;
`;
