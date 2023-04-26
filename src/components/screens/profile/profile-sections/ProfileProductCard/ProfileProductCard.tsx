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
  transition: 0.15s;
  color: ${COLORS.black};
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  overflow-wrap: anywhere;
  &:hover {
    transform: translateY(-3px);
    -webkit-box-shadow: 0px 3px 4px 0px ${COLORS.shadow};
    -moz-box-shadow: 0px 3px 4px 0px ${COLORS.shadow};
    box-shadow: 0px 3px 4px 0px ${COLORS.shadow};
  }
`;
const CardImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;
const CardTitle = styled.h4`
  width: 100%;
  padding: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: center;
`;
