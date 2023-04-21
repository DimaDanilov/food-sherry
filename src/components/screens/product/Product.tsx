import { updateProductStatus } from "@/api/ProductApi";
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
import { useState } from "react";
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
import { ImageGallery } from "./ImageGallery/ImageGallery";

interface IProductScreenProps {
  product: IProduct;
}

interface IRegularTextProps {
  fontColor?: string;
}

export const ProductScreen = observer(({ product }: IProductScreenProps) => {
  const authStore = useAuthStore();
  const [currentProduct, setCurrentProduct] = useState(product);

  const onReservingChange = async (
    productId: number,
    status: "reserved" | "open" | "closed"
  ) => {
    const newStatusInfo = await updateProductStatus(productId, status);
    setCurrentProduct({
      ...currentProduct,
      ...newStatusInfo,
    });
  };

  return (
    <FlexContainer>
      <FlexItem>
        <ImageGallery imageUrls={currentProduct.imagesSrc} />
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
        {currentProduct.status === "closed" && (
          <ProductStatus>Данный товар спасен</ProductStatus>
        )}
        {currentProduct.status === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id !== currentProduct.clientId &&
          (authStore.user.id !== currentProduct.author.id ? (
            <ProductStatus>Данный товар зерезервирован не вами</ProductStatus>
          ) : (
            <ProductStatus>
              Данный товар ваш, он зерезервирован другим человеком
            </ProductStatus>
          ))}

        {currentProduct.status === "open" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          authStore.user.id !== currentProduct.author.id && (
            <Button
              margin="10px auto"
              padding="10px"
              styleType="primary"
              onClick={() => onReservingChange(currentProduct.id, "reserved")}
            >
              Забронировать
            </Button>
          )}
        {currentProduct.status === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          (authStore.user.id === currentProduct.author.id ||
            authStore.user.id === currentProduct.clientId) && (
            <>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(currentProduct.id, "open")}
              >
                Снять бронь
              </Button>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(currentProduct.id, "closed")}
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
const FlexItem = styled.div`
  width: 45%;
`;
const RegularText = styled.p<IRegularTextProps>`
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
const ProductStatus = styled.h3`
  color: ${COLORS.darkgray};
`;
const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
  white-space: nowrap;
`;
