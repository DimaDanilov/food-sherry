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
import { useGiveProductStore } from "../store/GiveProductStore";
import { observer } from "mobx-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ICategory } from "@/models/Category";
import { loadCategories } from "@/api/CategoryApi";
import { DateTimeInput } from "@/ui/DateTimeInput";

const now = new Date();
const tzoffset = now.getTimezoneOffset() * 60000;
const dateToInput = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);

export const GiveProductForm = observer(() => {
  const giveProductStore = useGiveProductStore();

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
      giveProductStore.updateProductSelect(event.target.value);
    },
    [giveProductStore.updateProductSelect]
  );

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveProductStore.updateProductTitle(event.target.value);
    },
    [giveProductStore.updateProductTitle]
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      giveProductStore.updateProductDescription(event.target.value);
    },
    [giveProductStore.updateProductDescription]
  );

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveProductStore.updateProductAmount(event.target.value);
    },
    [giveProductStore.updateProductAmount]
  );

  const handleAddressChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveProductStore.updateProductAddress(event.target.value);
    },
    [giveProductStore.updateProductAddress]
  );

  const handleDateTimeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      giveProductStore.updateProductDatetimeToTake(event.target.value);
    },
    [giveProductStore.updateProductDatetimeToTake]
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
        inputValue={giveProductStore.productTitle}
        inputOnChange={handleTitleChange}
      />
      <TextArea
        name="description"
        rows={10}
        placeholder="Описание"
        styleType="primary"
        inputValue={giveProductStore.productDescription}
        inputOnChange={handleDescriptionChange}
      />
      <FormInput
        type="text"
        name="amount"
        placeholder="Количество"
        icon={<HiOutlineSquares2X2 color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        inputValue={giveProductStore.productAmount}
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
        inputValue={giveProductStore.productAddress}
        inputOnChange={handleAddressChange}
        required
      />
      <DateTimeInput
        name="takedate"
        styleType="primary"
        min={dateToInput}
        max="9999-12-31T23:59"
        value={giveProductStore.productDatetimeToTake}
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
