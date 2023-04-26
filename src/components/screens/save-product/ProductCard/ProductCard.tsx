import { IProduct } from "@/models/Product";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { IconWithText } from "@/ui/IconWithText";
import { parseTakeDate } from "@/utils/parseTakeDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import styled from "styled-components";

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();

  const handleClick = () => router.push(`/product/${product.id}`);

  return (
    <Card>
      <CardImage
        src={product.imagesSrc[0] || "/icons/product_placeholder.svg"}
        alt={product.title}
        width={200}
        height={200}
        onClick={handleClick}
      />
      <CardInfo>
        <CardTitle>{product.title}</CardTitle>
        <NavLink href={`/profile/${product.author.id}`} color="red">
          <IconWithText icon={<HiOutlineUser />} iconScale={1.3}>
            {product.author.name
              ? product.author.name + " " + product.author.surname
              : product.author.companyName}
          </IconWithText>
        </NavLink>
        <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
          {parseTakeDate(product.timeToTake) || "Outdated"}
        </IconWithText>
        <IconWithText icon={<HiOutlineMapPin />} iconScale={1.3}>
          {product.location}
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
  transition: 0.15s;
  border-radius: 15px;
  background-color: ${COLORS.white};
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  overflow-wrap: anywhere;
  &:hover {
    z-index: 1;
    transform: scale(1.005);
    -webkit-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    -moz-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
  }
`;
const CardInfo = styled.div`
  margin: 10px 20px;
`;

const CardImage = styled(Image)`
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  width: 100%;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  margin: 15px auto;
`;

const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
  white-space: nowrap;
`;
