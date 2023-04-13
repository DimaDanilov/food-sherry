import { FoodItem } from "@/models/FoodItem";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import { parseCreateDate } from "@/utils/parseCreateDate";
import { parseTakeDate } from "@/utils/parseTakeDate";
import Image from "next/image";
import { useState, useCallback, memo } from "react";
import {
  HiOutlineUser,
  HiOutlineCake,
  HiOutlineSquares2X2,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import styled from "styled-components";

interface IProductImageProps {
  imageUrl: string;
  index: number;
  currentImageID: number;
  onImageClick: (id: number) => void;
}
interface IProductScreenProps {
  product: FoodItem;
}

interface IRegularTextProps {
  fontColor?: string;
}
interface IProductImageSmallProps {
  border: string;
  cursor: string;
}

const ProductImage = memo(
  ({ imageUrl, index, currentImageID, onImageClick }: IProductImageProps) => {
    const border =
      index === currentImageID ? `6px double ${COLORS.mainColor}` : "none";
    const cursor = index === currentImageID ? "default" : "pointer";

    return (
      <ProductImageSmall
        alt=""
        src={imageUrl || "/icons/product_placeholder.svg"}
        width={100}
        height={100}
        onClick={() => onImageClick(index)}
        border={border}
        cursor={cursor}
      />
    );
  }
);

export default function ProductScreen({ product }: IProductScreenProps) {
  const handleClick = () => console.log("click");

  const [currentImageID, setCurrentImageID] = useState<number>(0);

  const onImageClick = useCallback((id: number) => {
    setCurrentImageID(id);
  }, []);

  return (
    <FlexContainer>
      <FlexItem>
        <ProductImagesContainer>
          <ProductImageBig
            alt=""
            src={
              product.imagesSrc[currentImageID] ||
              "/icons/product_placeholder.svg"
            }
            width={400}
            height={400}
          />
          <GridImages>
            {product.imagesSrc.map((imageUrl, index) => (
              <ProductImage
                key={index}
                imageUrl={imageUrl}
                index={index}
                currentImageID={currentImageID}
                onImageClick={onImageClick}
              />
            ))}
          </GridImages>
        </ProductImagesContainer>
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

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ProductImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
const ProductImageBig = styled(Image)`
  width: 100%;
`;
const ProductImageSmall = styled(Image)<IProductImageSmallProps>`
  width: 100%;
  height: 100%;
  border: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
`;
const RegularText = styled.p<IRegularTextProps>`
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
