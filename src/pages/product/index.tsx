import { productData } from "@/fake-data/productData";
import { FoodItem } from "@/models/FoodItem";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import PageTemplate from "@/ui/PageTemplate";
import Image from "next/image";
import styled from "styled-components";

export default function Product() {
  const foodItem: FoodItem = productData;

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
          <RegularText fontColor={COLORS.gray}>
            {foodItem.timeCreated}
          </RegularText>
          <IconWithText
            icon="/icons/user.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.author}
          </IconWithText>
          <IconWithText
            icon="/icons/food.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.category}
          </IconWithText>
          <RegularText>{foodItem.description}</RegularText>
          <IconWithText
            icon="/icons/shop.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.amount}
          </IconWithText>
          <IconWithText
            icon="/icons/clock.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.timeToTake}
          </IconWithText>
          <IconWithText
            icon="/icons/location.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.location}
          </IconWithText>
          <IconWithText
            icon="/icons/phone.svg"
            iconWidth={25}
            iconHeight={25}
            fontSize={FONT_SIZE.p}
          >
            {foodItem.phone}
          </IconWithText>
          <Button
            fontSize={FONT_SIZE.p}
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
  font-size: ${FONT_SIZE.h1};
  font-weight: ${FONT_WEIGHT.h1};
`;
const RegularText = styled.p<IRegularTextProps>`
  font-size: ${FONT_SIZE.p};
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
