import { FoodItem } from "@/models/FoodItem";
import { colors, lato } from "@/styles/globalStyles";
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
          fontSize={14}
        >
          {food.author}
        </IconWithText>
        <IconWithText
          icon="/icons/clock.svg"
          iconWidth={25}
          iconHeight={25}
          fontSize={14}
        >
          {food.timeToTake}
        </IconWithText>
        <IconWithText
          icon="/icons/location.svg"
          iconWidth={25}
          iconHeight={25}
          fontSize={14}
        >
          {food.location}
        </IconWithText>
        <Button
          fontSize={14}
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
  -webkit-box-shadow: 0px 0px 4px 0px ${colors.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${colors.shadow};
  box-shadow: 0px 0px 4px 0px ${colors.shadow};
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
  font-family: ${lato.style.fontFamily};
  font-size: 24;
  font-weight: 400;
`;
