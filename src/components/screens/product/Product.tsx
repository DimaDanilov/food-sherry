import { loadOneProduct, updateProductStatus } from "@/api/ProductApi";
import { IProduct } from "@/models/Product";
import { useAuthStore } from "@/store/AuthStore";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import { parseCreateDate } from "@/utils/parseCreateDate";
import { parseTakeDate } from "@/utils/parseTakeDate";
import { observer } from "mobx-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, memo } from "react";
import {
  HiOutlineUser,
  HiOutlineCake,
  HiOutlineSquares2X2,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import styled from "styled-components";

interface IProductImageProps {
  imageUrl: string;
  index: number;
  currentImageID: number;
  onImageClick: (id: number) => void;
}
interface IProductScreenProps {
  product: IProduct;
}

interface IRegularTextProps {
  fontColor?: string;
}
interface IProductImageSmallProps {
  border: string;
  cursor: string;
}

// Small image of product
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

export const ProductScreen = observer(({ product }: IProductScreenProps) => {
  const authStore = useAuthStore();
  const [currentProduct, setCurrentProduct] = useState(product);
  const [currentImageID, setCurrentImageID] = useState<number>(0);

  const onCreateReserving = async (productId: number) => {
    const newStatusInfo = await updateProductStatus(productId, "reserved");
    setCurrentProduct({
      ...currentProduct,
      ...newStatusInfo,
    });
  };
  const onDeleteReserving = async (productId: number) => {
    const newStatusInfo = await updateProductStatus(productId, "open");
    setCurrentProduct({
      ...currentProduct,
      ...newStatusInfo,
    });
  };
  const onCloseReserving = async (productId: number) => {
    const newStatusInfo = await updateProductStatus(productId, "closed");
    setCurrentProduct({
      ...currentProduct,
      ...newStatusInfo,
    });
  };

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
              currentProduct.imagesSrc[currentImageID] ||
              "/icons/product_placeholder.svg"
            }
            width={400}
            height={400}
          />
          <GridImages>
            {currentProduct.imagesSrc &&
              currentProduct.imagesSrc.map((imageUrl, index) => (
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
        <h1>{currentProduct.title}</h1>
        <RegularText fontColor={COLORS.gray}>
          Добавлено: {parseCreateDate(currentProduct.timeCreated)}
        </RegularText>
        <NavLink href={`/profile/${currentProduct.author.id}`} color="red">
          <IconWithText icon={<HiOutlineUser />} iconScale={1.3}>
            {currentProduct.author.name
              ? currentProduct.author.name + " " + currentProduct.author.surname
              : currentProduct.author.companyName}
          </IconWithText>
        </NavLink>
        <IconWithText icon={<HiOutlineCake />} iconScale={1.3}>
          {currentProduct.category.name}
        </IconWithText>
        <RegularText>{currentProduct.description}</RegularText>
        <IconWithText icon={<HiOutlineSquares2X2 />} iconScale={1.3}>
          {currentProduct.amount}
        </IconWithText>
        <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
          {parseTakeDate(currentProduct.timeToTake)
            ? `Можно забрать: ${parseTakeDate(currentProduct.timeToTake)}`
            : "Outdated"}
        </IconWithText>
        <IconWithText icon={<HiOutlineMapPin />} iconScale={1.3}>
          {currentProduct.location}
        </IconWithText>
        <IconWithText icon={<HiOutlineEnvelope />} iconScale={1.3}>
          {currentProduct.author.email}
        </IconWithText>
        <IconWithText icon={<HiOutlinePhone />} iconScale={1.3}>
          {currentProduct.author.phone}
        </IconWithText>
        {currentProduct.status === "open" &&
          authStore.firstLoadCompleted &&
          authStore.user.id !== currentProduct.author.id && (
            <Button
              margin="10px auto"
              padding="10px"
              styleType="primary"
              onClick={() => onCreateReserving(currentProduct.id)}
            >
              Забронировать
            </Button>
          )}
        {currentProduct.status === "reserved" &&
          authStore.firstLoadCompleted &&
          (authStore.user.id === currentProduct.author.id ||
            authStore.user.id === currentProduct.clientId) && (
            <>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onDeleteReserving(currentProduct.id)}
              >
                Снять бронь
              </Button>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onCloseReserving(currentProduct.id)}
              >
                Закрыть бронь
              </Button>
            </>
          )}
      </FlexItem>
    </FlexContainer>
  );
});

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
const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
  white-space: nowrap;
`;
