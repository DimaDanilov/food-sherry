import { ProductShortModel } from "@/models/Product";
import { COLORS } from "@/styles/globalStyles";
import { ButtonCommon } from "@/ui/forms/buttons/ButtonCommon";
import { IconWithText } from "@/ui/layout/IconWithText";
import { parseTakeDate } from "@/utils/parseTakeDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import styled from "styled-components";

type ProductCardProps = {
  product: ProductShortModel;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [date, setDate] = useState<string>("");
  const router = useRouter();

  const handleClick = () => router.push(`/product/${product.id}`);

  useEffect(() => {
    setDate(parseTakeDate(product.timeToTake) || "Outdated");
  }, []);

  return (
    <Card>
      <CardImage
        src={product.imagesSrc[0] || "/icons/product_placeholder.svg"}
        alt={product.title}
        width={200}
        height={200}
        onClick={handleClick}
      />
      <CardContent>
        <CardTitle>{product.title}</CardTitle>
        <CardInfo>
          <NavLink href={`/profile/${product.author.id}`} color="red">
            <IconWithText
              icon={<HiOutlineUser />}
              iconScale={1.3}
              hideStringsExcept={1}
            >
              {product.author.name
                ? product.author.name + " " + product.author.surname
                : product.author.companyName}
            </IconWithText>
          </NavLink>
          <IconWithText
            icon={<HiOutlineClock />}
            iconScale={1.3}
            hideStringsExcept={1}
          >
            {date}
          </IconWithText>
          <IconWithText
            icon={<HiOutlineMapPin />}
            iconScale={1.3}
            hideStringsExcept={1}
          >
            {product.location}
          </IconWithText>
          <CardButton
            width="100%"
            margin="10px auto"
            padding="10px"
            styleType="primary"
            onClick={handleClick}
          >
            Посмотреть
          </CardButton>
        </CardInfo>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  transition: 0.15s;
  border-radius: 15px;
  background-color: ${COLORS.white};
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  overflow-wrap: anywhere;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.005);
    -webkit-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    -moz-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
  }
`;

const CardContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const CardInfo = styled.div``;

const CardImage = styled(Image)`
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  width: 100%;
  object-fit: cover;
`;

const CardTitle = styled.h3`
  margin: 8px 0;
  /* Hide text when overflow more than N lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
`;

const CardButton = styled(ButtonCommon)``;
