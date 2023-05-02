import styled from "styled-components";
import { PropsWithChildren } from "react";
import { COLORS } from "@/styles/globalStyles";

type FormSelectProps = {
  name: string;
  styleType: "primary" | "secondary";
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

export const FormSelect = ({
  name,
  styleType,
  children,
  onChange,
  required,
}: PropsWithChildren<FormSelectProps>) => {
  return (
    <Container
      mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
    >
      <CustomFormSelect
        name={name}
        mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
        placeholderColor={
          styleType === "primary"
            ? COLORS.placeholderMain
            : COLORS.placeholderWhite
        }
        onChange={onChange}
        required={required}
        defaultValue=""
      >
        <option key={-1} value="" disabled hidden>
          Категория
        </option>
        {children}
      </CustomFormSelect>
    </Container>
  );
};

type ContainerProps = {
  mainColor: string;
};

const Container = styled.div<ContainerProps>`
  border: 2px solid ${(props) => props.mainColor};
  border-radius: 10px;
`;

type CustomFormSelectProps = {
  mainColor: string;
  placeholderColor: string;
};

const CustomFormSelect = styled.select<CustomFormSelectProps>`
  color: ${(props) => props.placeholderColor};
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  outline: 0;
  & > option:enabled {
    color: ${(props) => props.mainColor};
  }
`;
