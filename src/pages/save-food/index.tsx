import FoodCard from "@/components/save-food/FoodCard";
import { FoodItem } from "@/models/FoodItem";
import { Container } from "@/ui/Container";
import PageTemplate from "@/ui/PageTemplate";
import styled from "styled-components";

export default function SaveFood() {
  const foodItems: FoodItem[] = [
    {
      id: "1",
      title: "Хлеб",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Суббота 14:00 - 18:00",
      location: "ул. Пушкина, д. 7",
      imageSrc: "/images/landing_background.jpg",
    },
    {
      id: "2",
      title: "Tomatoes",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Пятница 15:00 - 19:00",
      location: "ул. Кукушкина, д. 10",
      imageSrc: "/images/landing_background.jpg",
    },
    {
      id: "3",
      title: "Йогурт",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Вторник 8:00 - 18:00",
      location: "ул. Таганская, д. 15",
      imageSrc: "/images/landing_background.jpg",
    },
    {
      id: "4",
      title: "Шоколад",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Воскресенье 10:00 - 20:00",
      location: "ул. Тверская, д. 28",
      imageSrc: "/images/landing_background.jpg",
    },
    {
      id: "5",
      title: "Бананы",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Суббота 16:00 - 18:00",
      location: "ул. Поповича, д. 5",
      imageSrc: "/images/landing_background.jpg",
    },
    {
      id: "6",
      title: "Печеньки",
      author: "Дмитрий Джаваскриптович",
      timeToTake: "Понедельник 9:00 - 18:00",
      location: "ул. Ревягина, д. 25",
      imageSrc: "/images/landing_background.jpg",
    },
  ];

  const foodCards = foodItems.map((f) => {
    return <FoodCard key={f.id} food={f} />;
  });

  return (
    <PageTemplate>
      <Container>
        <FoodSearch type="text" name="food_search" id="food_search" />
        <CardsContainer>{foodCards}</CardsContainer>
      </Container>
    </PageTemplate>
  );
}

const FoodSearch = styled.input`
  width: 100%;
  padding: 10px 40px;
  border-radius: 20px;
  border: 2px solid #bdbdbd;

  background: url("/icons/search.svg") no-repeat left;
  background-position: 15px 50%;
  background-size: 20px;
  :focus {
    outline: none;
    border-color: #7d7d7d;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 3% 0;
  gap: 10vh 5vh;
`;
