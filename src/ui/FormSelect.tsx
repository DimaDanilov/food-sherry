import styled from "styled-components";
import { PropsWithChildren } from "react";
import { COLORS } from "@/styles/globalStyles";

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
        defaultValue="default"
      >
        <option key={-1} value="default" disabled hidden>
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
  & > option:enabled {
    color: ${(props) => props.mainColor};
  }
`;
