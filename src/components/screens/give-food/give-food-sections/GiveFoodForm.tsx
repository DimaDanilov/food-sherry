import { COLORS } from "@/styles/globalStyles";
import { FormInput } from "@/ui/FormInput";
import {
  HiOutlineCake,
  HiOutlineMapPin,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { TextArea } from "@/ui/TextArea";
import { FormSelect } from "@/ui/FormSelect";
import Button from "@/ui/Button";
import styled from "styled-components";
import { useGiveFoodStore } from "../store/GiveFoodStore";
import { observer } from "mobx-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ICategory } from "@/models/Category";
import { loadCategories } from "@/api/CategoryRest";
import { DateTimeInput } from "@/ui/DateTimeInput";

const now = new Date();
const tzoffset = now.getTimezoneOffset() * 60000;
const dateToInput = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);

export const GiveFoodForm = observer(() => {
  const giveFoodStore = useGiveFoodStore();

  const [categoriesList, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const categories = await loadCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoriesOptions = useMemo(
    () =>
      categoriesList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      )),
    [categoriesList]
  );

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      giveFoodStore.updateProductSelect(event.target.value);
    },
    [giveFoodStore.updateProductSelect]
  );

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveFoodStore.updateProductTitle(event.target.value);
    },
    [giveFoodStore.updateProductTitle]
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      giveFoodStore.updateProductDescription(event.target.value);
    },
    [giveFoodStore.updateProductDescription]
  );

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveFoodStore.updateProductAmount(event.target.value);
    },
    [giveFoodStore.updateProductAmount]
  );

  const handleAddressChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveFoodStore.updateProductAddress(event.target.value);
    },
    [giveFoodStore.updateProductAddress]
  );

  const handleDateTimeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveFoodStore.updateProductDatetimeToTake(event.target.value);
    },
    [giveFoodStore.updateProductDatetimeToTake]
  );

  return (
    <FieldsContainer>
      <FormSelect
        name="select"
        styleType="primary"
        required
        onChange={handleSelectChange}
      >
        {categoriesOptions}
      </FormSelect>
      <FormInput
        type="text"
        name="foodname"
        placeholder="Название"
        icon={<HiOutlineCake color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        required
        inputValue={giveFoodStore.productTitle}
        inputOnChange={handleTitleChange}
      />
      <TextArea
        name="description"
        rows={10}
        placeholder="Описание"
        styleType="primary"
        inputValue={giveFoodStore.productDescription}
        inputOnChange={handleDescriptionChange}
      />
      <FormInput
        type="text"
        name="amount"
        placeholder="Количество"
        icon={<HiOutlineSquares2X2 color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        inputValue={giveFoodStore.productAmount}
        inputOnChange={handleAmountChange}
        required
      />
      <FormInput
        type="text"
        name="address"
        placeholder="Адрес"
        icon={<HiOutlineMapPin color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        inputValue={giveFoodStore.productAddress}
        inputOnChange={handleAddressChange}
        required
      />
      <DateTimeInput
        name="takedate"
        styleType="primary"
        min={dateToInput}
        max="9999-12-31T23:59"
        value={giveFoodStore.productDatetimeToTake}
        onChange={handleDateTimeChange}
        required
      />
      <Button type="submit" padding="10px" styleType="primary" value="Submit">
        Создать объявление
      </Button>
    </FieldsContainer>
  );
});

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
