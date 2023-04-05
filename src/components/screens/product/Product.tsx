import { productFakeData } from "@/fake-data/productData";
import { FoodItem } from "@/models/FoodItem";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import Image from "next/image";
import {
  HiOutlineUser,
  HiOutlineCake,
  HiOutlineSquares2X2,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import styled from "styled-components";

export default function ProductScreen() {
  const foodItem: FoodItem = productFakeData;

  const handleClick = () => console.log("click");

  return (
    <FlexContainer>
      <FlexItem>
        <ProductImage alt="" src={foodItem.imageSrc} width={550} height={550} />
      </FlexItem>
      <FlexItem>
        <Title>{foodItem.title}</Title>
        <RegularText fontColor={COLORS.gray}>
          {foodItem.timeCreated}
        </RegularText>
        <IconWithText
          icon={<HiOutlineUser />}
          iconScale={1.3}
          fontSize={FONT_SIZE.p}
        >
          {foodItem.author}
        </IconWithText>
        <IconWithText
          icon={<HiOutlineCake />}
          iconScale={1.3}
          fontSize={FONT_SIZE.p}
        >
          {foodItem.category}
        </IconWithText>
        <RegularText>{foodItem.description}</RegularText>
        <IconWithText
          icon={<HiOutlineSquares2X2 />}
          iconScale={1.3}
          fontSize={FONT_SIZE.p}
        >
          {foodItem.amount}
        </IconWithText>
        <IconWithText
          icon={<HiOutlineClock />}
          iconScale={1.3}
          fontSize={FONT_SIZE.p}
        >
          {foodItem.timeToTake}
        </IconWithText>
        <IconWithText
          icon={<HiOutlineMapPin />}
          iconScale={1.3}
          fontSize={FONT_SIZE.p}
        >
          {foodItem.location}
        </IconWithText>
        <IconWithText
          icon={<HiOutlinePhone />}
          iconScale={1.3}
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
`;
const RegularText = styled.p<IRegularTextProps>`
  font-size: ${FONT_SIZE.p};
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
