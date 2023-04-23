import { IProductProfile } from "@/models/Product";
import { COLORS } from "@/styles/globalStyles";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const ProfileProductCard = ({
  product,
}: {
  product: IProductProfile;
}) => {
  return (
    <Card href={`/product/${product.id}`}>
      <CardImage
        src={product.imagesSrc[0]}
        alt={product.title}
        width={300}
        height={300}
      />
      <CardTitle>{product.title}</CardTitle>
    </Card>
  );
};

const Card = styled(Link)`
  color: ${COLORS.black};
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 7px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 7px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 7px 0px ${COLORS.shadow};
  overflow-wrap: anywhere;
`;
const CardImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 15px 15px 0 0;
`;
const CardTitle = styled.h3`
  width: 100%;
  height: auto;
`;
