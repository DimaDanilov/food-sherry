import styled from "styled-components";
import { PropsWithChildren } from "react";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";

interface IFormSelect {
  name: string;
  styleType: "primary" | "secondary";
  required?: boolean;
}

export function FormSelect({
  name,
  styleType,
  children,
  required,
}: PropsWithChildren<IFormSelect>) {
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
        required={required}
      >
        <option value="" disabled selected hidden>
          Категория
        </option>
        {children}
      </CustomFormSelect>
    </Container>
  );
}

const Container = styled.div<{ mainColor: string }>`
  border: 2px solid ${(props) => props.mainColor};
  border-radius: 10px;
`;
const CustomFormSelect = styled.select<{
  mainColor: string;
  placeholderColor: string;
}>`
  color: ${(props) => props.placeholderColor};
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  outline: 0;
  font-size: ${FONT_SIZE.select};
  & > option:enabled {
    color: ${(props) => props.mainColor};
  }
`;
