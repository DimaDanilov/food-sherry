import { COLORS } from "@/styles/globalStyles";
import { FormInput } from "@/ui/FormInput";
import {
  HiOutlineCake,
  HiOutlineMapPin,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { TextArea } from "@/ui/TextArea";
import { FormSelect } from "@/ui/FormSelect";
import { categoriesList } from "@/fake-data/categoriesList";
import Button from "@/ui/Button";
import styled from "styled-components";
import { useGiveFoodStore } from "../store/GiveFoodStore";
import { observer } from "mobx-react";

export const GiveFoodForm = observer(() => {
  const giveFoodStore = useGiveFoodStore();

  const categoriesOptions = categoriesList.map((category, index) => (
    <option key={index} value={index}>
      {category}
    </option>
  ));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    giveFoodStore.updateProductSelect(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    giveFoodStore.updateProductTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    giveFoodStore.updateProductDescription(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    giveFoodStore.updateProductAmount(event.target.value);
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    giveFoodStore.updateProductAddress(event.target.value);
  };
  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    giveFoodStore.updateProductDatetimeToTake(event.target.value);
  };

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
      <input
        id="takedate"
        name="takedate"
        type="datetime-local"
        min={new Date().toISOString().substring(0, 16)}
        max="9999-12-31T23:59"
        value={giveFoodStore.productDatetimeToTake}
        onChange={handleDateTimeChange}
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
