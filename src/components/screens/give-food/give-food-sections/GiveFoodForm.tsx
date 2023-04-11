import { COLORS } from "@/styles/globalStyles";
import { Form } from "@/ui/Form";
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

export const GiveFoodForm = () => {
  const categoriesOptions = categoriesList.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));

  return (
    <FieldsContainer>
      <FormSelect name="select" styleType="primary" required>
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
      />
      <TextArea
        name="description"
        rows={10}
        placeholder="Описание"
        styleType="primary"
      />
      <FormInput
        type="text"
        name="amount"
        placeholder="Количество"
        icon={<HiOutlineSquares2X2 color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        required
      />
      <FormInput
        type="text"
        name="address"
        placeholder="Адрес"
        icon={<HiOutlineMapPin color={COLORS.mainColor} />}
        iconScale={1.5}
        styleType="primary"
        required
      />
      <Button type="submit" padding="10px" styleType="primary" value="Submit">
        Создать объявление
      </Button>
    </FieldsContainer>
  );
};

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
