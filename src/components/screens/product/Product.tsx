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
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import styled from "styled-components";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { InputUpdate } from "@/ui/InputUpdate";
import { ButtonIcon } from "@/ui/ButtonIcon";

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
        <FlexTitleContainer>
          <h1>{product.title}</h1>
          {/* Edit button */}
          {product.author.id === authStore.user.id &&
            productStatus !== "closed" && (
              <ButtonIcon
                icon={<HiOutlinePencilSquare size={16} />}
                iconScale={1.7}
                onClick={onEditClick}
                active={isEditMode}
              />
            )}
        </FlexTitleContainer>

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

        <BlockWithTooltip>
          <IconWithText icon={<HiOutlineClock />} iconScale={1.3}>
            {parseTakeDate(product.timeToTake)
              ? `Можно забрать: ${parseTakeDate(product.timeToTake)}`
              : "Outdated"}
          </IconWithText>
          <Tooltip>{new Date(product.timeToTake).toLocaleString()}</Tooltip>
        </BlockWithTooltip>

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
          <ProductStatusDesc>Данный товар спасен</ProductStatusDesc>
        )}
        {productStatus === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id !== clientId &&
          (authStore.user.id !== product.author.id ? (
            <ProductStatusDesc>
              Данный товар уже кем-то зерезервирован
            </ProductStatusDesc>
          ) : (
            <ProductStatusDesc>
              Данный товар ваш, он зерезервирован{" "}
              <NavLink href={"/profile/" + clientId}>другим человеком</NavLink>
            </ProductStatusDesc>
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
const FlexTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RegularText = styled.p<IRegularTextProps>`
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;
const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 120%;
  z-index: 2;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${COLORS.white};
  background-color: ${COLORS.mainColor};
`;
const BlockWithTooltip = styled.div`
  position: relative;
  cursor: pointer;
  text-decoration: underline dotted;
  &:hover > ${Tooltip} {
    display: block;
  }
`;
const ProductStatusDesc = styled.h4`
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
