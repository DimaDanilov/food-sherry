import { FoodItem } from "@/models/FoodItem";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import { parseCreateDate } from "@/utils/parseCreateDate";
import { parseTakeDate } from "@/utils/parseTakeDate";
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

export default function ProductScreen({ product }: { product: FoodItem }) {
  const handleClick = () => console.log("click");

  const imageElements = product.imagesSrc.map((imageUrl) => {
    return (
      <Image
        alt=""
        src={imageUrl || "/icons/product_placeholder.svg"}
        width={150}
        height={150}
      />
    );
  });

  return (
    <FlexContainer>
      <FlexItem>
        <ProductImage
          alt=""
          src={product.imagesSrc[0] || "/icons/product_placeholder.svg"}
          width={550}
          height={550}
        />
        <GridImages>{imageElements}</GridImages>
      </FlexItem>
      <FlexItem>
        <h1>{product.title}</h1>
        <RegularText fontColor={COLORS.gray}>
          Добавлено: {parseCreateDate(product.timeCreated)}
        </RegularText>
        <IconWithText icon={<HiOutlineUser />} iconScale={1.3}>
          {product.author}
        </IconWithText>
        <IconWithText icon={<HiOutlineCake />} iconScale={1.3}>
          {product.category.name}
        </IconWithText>
        <RegularText>{product.description}</RegularText>
        <IconWithText icon={<HiOutlineSquares2X2 />} iconScale={1.3}>
          {product.amount}
        </IconWithText>
        <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
          {parseTakeDate(product.timeToTake)
            ? `Можно забрать: ${parseTakeDate(product.timeToTake)}`
            : "Closed"}
        </IconWithText>
        <IconWithText icon={<HiOutlineMapPin />} iconScale={1.3}>
          {product.location}
        </IconWithText>
        <IconWithText icon={<HiOutlinePhone />} iconScale={1.3}>
          {product.phone}
        </IconWithText>
        <Button
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
const GridImages = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 10px;
`;
const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const RegularText = styled.p<IRegularTextProps>`
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
