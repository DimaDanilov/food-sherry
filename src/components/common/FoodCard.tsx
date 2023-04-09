import { FoodItem } from "@/models/FoodItem";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { IconWithText } from "@/ui/IconWithText";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import styled from "styled-components";

export default function FoodCard({ food }: { food: FoodItem }) {
  const router = useRouter();

  const handleClick = () => router.push("/product");

  return (
    <Card>
      <CardImage
        src={food.imageSrc || "/images/landing_background.jpg"}
        alt={food.title}
        width={150}
        height={150}
        style={{ width: "100%", height: "auto" }}
        onClick={handleClick}
      />
      <CardInfo>
        <CardTitle>{food.title}</CardTitle>
        <IconWithText icon={<HiOutlineUser />} iconScale={1.3}>
          {food.author}
        </IconWithText>
        <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
          {food.timeToTake}
        </IconWithText>
        <IconWithText icon={<HiOutlineMapPin />} iconScale={1.3}>
          {food.location}
        </IconWithText>
        <Button
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
  margin: 10px 20px;
`;

const CardImage = styled(Image)`
  border-radius: 15px 15px 0 0;
  cursor: pointer;
`;

const CardTitle = styled.h2`
  margin: 15px auto;
`;
