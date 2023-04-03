import styled from "styled-components";
import { PropsWithChildren } from "react";
import { COLORS } from "@/styles/globalStyles";

interface IFormSelect {
  name: string;
  styleType: "primary" | "secondary";
}

export function FormSelect({
  name,
  styleType,
  children,
}: PropsWithChildren<IFormSelect>) {
  return (
    <Container
      mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
    >
      <CustomFormSelect
        name={name}
        mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      >
        {children}
      </CustomFormSelect>
    </Container>
  );
}

const Container = styled.div<{ mainColor: string }>`
  border: 2px solid ${(props) => props.mainColor};
  border-radius: 10px;
`;
const CustomFormSelect = styled.select<{ mainColor: string }>`
  color: ${(props) => props.mainColor};
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  outline: 0;
  & > option {
    padding: 10px;
  }
`;
