import { updateProduct, updateProductStatus } from "@/api/ProductApi";
import { IProduct, ProductStatus } from "@/models/Product";
import { useAuthStore } from "@/store/AuthStore";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { IconWithText } from "@/ui/IconWithText";
import { parseCreateDate } from "@/utils/parseCreateDate";
import { parseTakeDate } from "@/utils/parseTakeDate";
import { observer } from "mobx-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { InputUpdate } from "@/ui/InputUpdate";

interface IProductScreenProps {
  product: IProduct;
}

interface IRegularTextProps {
  fontColor?: string;
}

export const ProductScreen = observer(({ product }: IProductScreenProps) => {
  const authStore = useAuthStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [clientId, setClientId] = useState<number>(product.clientId);
  const [productStatus, setProductStatus] = useState<ProductStatus>(
    product.status
  );

  const [description, setDescription] = useState<string>(product.description);
  const [amount, setAmount] = useState<string>(product.amount);
  const [location, setLocation] = useState<string>(product.location);

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onEditClick = async () => {
    try {
      if (isEditMode) {
        await updateProduct(product.id, description, amount, location);
      }
      setIsEditMode(!isEditMode);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsEditMode(false);
    setClientId(product.clientId);
    setProductStatus(product.status);
    setDescription(product.description);
    setAmount(product.amount);
    setLocation(product.location);
  }, [product]);

  const onReservingChange = async (
    productId: number,
    status: ProductStatus
  ) => {
    const newStatusInfo = await updateProductStatus(productId, status);
    setProductStatus(newStatusInfo.status);
    setClientId(newStatusInfo.clientId);
  };

  return (
    <FlexContainer>
      <FlexItem>
        <ImageGallery imageUrls={product.imagesSrc} />
      </FlexItem>
      <FlexItem>
        {product.author.id === authStore.user.id && (
          <Button onClick={onEditClick} styleType="primary" padding="8px 0">
            {isEditMode ? "Сохранить редактирование" : "Редактировать"}
          </Button>
        )}

        <h1>{product.title}</h1>
        <RegularText fontColor={COLORS.gray}>
          Добавлено: {parseCreateDate(product.timeCreated)}
        </RegularText>
        <NavLink href={`/profile/${product.author.id}`} color="red">
          <IconWithText icon={<HiOutlineUser />} iconScale={1.3}>
            {product.author.name
              ? product.author.name + " " + product.author.surname
              : product.author.companyName}
          </IconWithText>
        </NavLink>
        <IconWithText icon={<HiOutlineCake />} iconScale={1.3}>
          {product.category.name}
        </IconWithText>

        {product.description && isEditMode ? (
          <InputUpdate
            autoFocus={true}
            type="text"
            name="description"
            placeholder="Description..."
            value={description}
            onChange={onDescriptionChange}
          />
        ) : (
          <RegularText>{description}</RegularText>
        )}

        {product.amount && isEditMode ? (
          <InputUpdate
            type="text"
            name="amount"
            placeholder="Product Amount..."
            value={amount}
            onChange={onAmountChange}
          />
        ) : (
          <IconWithText icon={<HiOutlineSquares2X2 />} iconScale={1.3}>
            {amount}
          </IconWithText>
        )}

        <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
          {parseTakeDate(product.timeToTake)
            ? `Можно забрать: ${parseTakeDate(product.timeToTake)}`
            : "Outdated"}
        </IconWithText>

        {product.location && isEditMode ? (
          <InputUpdate
            type="text"
            name="address"
            placeholder="Address to take food..."
            value={location}
            onChange={onLocationChange}
          />
        ) : (
          <IconWithText icon={<HiOutlineMapPin />} iconScale={1.3}>
            {location}
          </IconWithText>
        )}

        <IconWithText icon={<HiOutlineEnvelope />} iconScale={1.3}>
          {product.author.email}
        </IconWithText>
        <IconWithText icon={<HiOutlinePhone />} iconScale={1.3}>
          {product.author.phone}
        </IconWithText>

        {/* Status info */}
        {productStatus === "closed" && (
          <ProductStatus>Данный товар спасен</ProductStatus>
        )}
        {productStatus === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id !== clientId &&
          (authStore.user.id !== product.author.id ? (
            <ProductStatus>
              Данный товар уже кем-то зерезервирован
            </ProductStatus>
          ) : (
            <ProductStatus>
              Данный товар ваш, он зерезервирован{" "}
              <NavLink href={"/profile/" + clientId}>другим человеком</NavLink>
            </ProductStatus>
          ))}

        {/* Buttons */}
        {productStatus === "open" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          authStore.user.id !== product.author.id && (
            <Button
              margin="10px auto"
              padding="10px"
              styleType="primary"
              onClick={() => onReservingChange(product.id, "reserved")}
            >
              Забронировать
            </Button>
          )}
        {productStatus === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          (authStore.user.id === product.author.id ||
            authStore.user.id === clientId) && (
            <>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(product.id, "open")}
              >
                Снять бронь
              </Button>
              <Button
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(product.id, "closed")}
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
const ProductStatus = styled.h4`
  margin: 15px auto;
  color: ${COLORS.darkgray};
  & a {
    font-size: ${FONT_SIZE.h4};
    text-decoration: dashed underline;
  }
`;
const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
  white-space: nowrap;
`;
const Input = styled.input`
  transition: 0.2s ease-in;
  width: 100%;
  margin: 5px auto;
  border-radius: 5px;
  border: 1px solid ${COLORS.mainColor};
  padding: 7px;
  &:focus {
    outline-color: ${COLORS.mainColor};
  }
`;
