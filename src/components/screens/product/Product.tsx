import { updateProduct, updateProductStatus } from "@/api/ProductApi";
import { ProductModel, ProductStatusType } from "@/models/Product";
import { useAuthStore } from "@/store/AuthStore";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import { ButtonCommon } from "@/ui/forms/buttons/ButtonCommon";
import { Container } from "@/ui/layout/Container";
import { IconWithText } from "@/ui/layout/IconWithText";
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
import { InputUpdateData } from "@/ui/forms/inputs/InputUpdateData";
import { ButtonIcon } from "@/ui/forms/buttons/ButtonIcon";

type ProductScreenProps = {
  product: ProductModel;
};

export const ProductScreen = observer(({ product }: ProductScreenProps) => {
  const authStore = useAuthStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [clientId, setClientId] = useState<number>(product.clientId);
  const [productStatus, setProductStatus] = useState<ProductStatusType>(
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
    } catch (e: any) {
      alert(e.response.data.message);
      console.error(e);
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
    status: ProductStatusType
  ) => {
    try {
      const newStatusInfo = await updateProductStatus(productId, status);
      setProductStatus(newStatusInfo.status);
      setClientId(newStatusInfo.clientId);
    } catch (e: any) {
      alert(e.response.data.message);
      console.error(e);
    }
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
          <InputUpdateData
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
          <InputUpdateData
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
            {productStatus !== "closed"
              ? parseTakeDate(product.timeToTake)
                ? `Можно забрать: ${parseTakeDate(product.timeToTake)}`
                : "Outdated"
              : "Closed"}
          </IconWithText>
          <Tooltip>{new Date(product.timeToTake).toLocaleString()}</Tooltip>
        </BlockWithTooltip>

        {product.location && isEditMode ? (
          <InputUpdateData
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
          <ProductStatusDescription>
            Данный товар спасен
          </ProductStatusDescription>
        )}
        {productStatus === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id !== clientId &&
          (authStore.user.id !== product.author.id ? (
            <ProductStatusDescription>
              Данный товар уже кем-то зерезервирован
            </ProductStatusDescription>
          ) : (
            <ProductStatusDescription>
              Данный товар ваш, он зерезервирован{" "}
              <NavLink href={"/profile/" + clientId}>другим человеком</NavLink>
            </ProductStatusDescription>
          ))}

        {/* Buttons */}
        {productStatus === "open" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          authStore.user.id !== product.author.id && (
            <ButtonCommon
              margin="10px auto"
              padding="10px"
              styleType="primary"
              onClick={() => onReservingChange(product.id, "reserved")}
            >
              Забронировать
            </ButtonCommon>
          )}
        {productStatus === "reserved" &&
          authStore.firstLoadCompleted &&
          authStore.user.id &&
          (authStore.user.id === product.author.id ||
            authStore.user.id === clientId) && (
            <>
              <ButtonCommon
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(product.id, "open")}
              >
                Снять бронь
              </ButtonCommon>
              <ButtonCommon
                margin="10px auto"
                padding="10px"
                styleType="primary"
                onClick={() => onReservingChange(product.id, "closed")}
              >
                Закрыть бронь
              </ButtonCommon>
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

type RegularTextProps = {
  fontColor?: string;
};

const RegularText = styled.p<RegularTextProps>`
  margin: 10px auto;
  color: ${(props) => props.fontColor};
`;

const NavLink = styled(Link)`
  color: ${COLORS.darkgray};
  white-space: nowrap;
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

const ProductStatusDescription = styled.h4`
  margin: 15px auto;
  color: ${COLORS.darkgray};
  & a {
    font-size: ${FONT_SIZE.h4};
    text-decoration: dashed underline;
  }
`;
