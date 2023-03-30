import { FoodItem } from "@/models/FoodItem";
import { lato } from "@/styles/fonts";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import PageTemplate from "@/ui/PageTemplate";
import Image from "next/image";
import styled from "styled-components";

export default function Product() {
  const foodItem: FoodItem = {
    id: "1",
    title: "Хлеб",
    author: "Дмитрий Джаваскриптович",
    category: "Мучные изделия",
    description:
      "Хлебушек бородинский, свежий из печи. Недавно испекли, но остался лишний. Всего 3 батона. Заберите пожалуйста его.",
    amount: "3 батона",
    timeCreated: "Пятница 14:00 - 18:00",
    timeToTake: "Суббота 14:00 - 18:00",
    location: "ул. Пушкина, д. 7",
    phone: "+79031112233",
    imageSrc: "/images/landing_background.jpg",
  };

  const handleClick = () => console.log("click");

  return (
    <PageTemplate>
      <FlexContainer>
        <FlexItem>
          <ProductImage
            alt=""
            src={foodItem.imageSrc}
            width={550}
            height={550}
          />
        </FlexItem>
        <FlexItem>
          <Title>{foodItem.title}</Title>
          <RegularText fontColor="#848484">{foodItem.timeCreated}</RegularText>
          <IconWithText
            icon="/icons/user.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.author}
          </IconWithText>
          <IconWithText
            icon="/icons/food.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.category}
          </IconWithText>
          <RegularText>{foodItem.description}</RegularText>
          <IconWithText
            icon="/icons/shop.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.amount}
          </IconWithText>
          <IconWithText
            icon="/icons/clock.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.timeToTake}
          </IconWithText>
          <IconWithText
            icon="/icons/location.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.location}
          </IconWithText>
          <IconWithText
            icon="/icons/phone.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={16}
          >
            {foodItem.phone}
          </IconWithText>
          <Button
            fontSize={14}
            margin="10px auto"
            padding="10px"
            styleType="primary"
            onClick={handleClick}
          >
            Забрать
          </Button>
        </FlexItem>
      </FlexContainer>
    </PageTemplate>
  );
}

interface IRegularTextProps {
  fontColor?: string;
}

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const FlexItem = styled.div`
  width: 45%;
`;
const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-family: ${lato.style.fontFamily};
  font-size: 32px;
  font-weight: 400;
`;
const RegularText = styled.p<IRegularTextProps>`
  font-family: ${lato.style.fontFamily};
  font-size: 16px;
  font-weight: 400;
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
