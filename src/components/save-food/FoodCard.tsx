import { FoodItem } from "@/models/FoodItem";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { IconWithText } from "@/ui/IconWithText";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function FoodCard({ food }: { food: FoodItem }) {
  const router = useRouter();

  const handleClick = () => router.push("/product");

  return (
    <Card>
      <CardImage
        src={food.imageSrc}
        alt={food.title}
        width={150}
        height={150}
        style={{ width: "100%", height: "auto" }}
        onClick={handleClick}
      />
      <CardInfo>
        <CardTitle>{food.title}</CardTitle>
        <IconWithText
          icon="/icons/user.svg"
          iconWidth={25}
          iconHeight={25}
          fontSize={FONT_SIZE.p}
        >
          {food.author}
        </IconWithText>
        <IconWithText
          icon="/icons/clock.svg"
          iconWidth={25}
          iconHeight={25}
          fontSize={FONT_SIZE.p}
        >
          {food.timeToTake}
        </IconWithText>
        <IconWithText
          icon="/icons/location.svg"
          iconWidth={25}
          iconHeight={25}
          fontSize={FONT_SIZE.p}
        >
          {food.location}
        </IconWithText>
        <Button
          fontSize={FONT_SIZE.p}
          margin="10px auto"
          padding="10px"
          styleType="primary"
          onClick={handleClick}
        >
          Посмотреть
        </Button>
      </CardInfo>
    </Card>
  );
}

const Card = styled.div`
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
`;
const CardInfo = styled.div`
  margin: 20px;
`;

const CardImage = styled(Image)`
  border-radius: 15px 15px 0 0;
  cursor: pointer;
`;

const CardTitle = styled.h2`
  margin: 15px auto;
  font-size: ${FONT_SIZE.h2};
  font-weight: ${FONT_WEIGHT.h1};
`;
