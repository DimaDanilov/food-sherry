import { lato } from "@/styles/fonts";
import React from "react";
import styled from "styled-components";

type TButton = {
  width?: string;
  children: string;
  fontSize: number;
  [x: string]: any;
};

export default function Button({
  width,
  fontSize,
  children,
  ...props
}: TButton) {
  return (
    <StyledButton width={width || "100%"} fontSize={fontSize + "px"} {...props}>
      {children}
    </StyledButton>
  );
}

interface IStyledBtnProps {
  width: string;
  fontSize: string;
}

const StyledButton = styled.button<IStyledBtnProps>`
  background-color: #289672;
  color: white;
  border: none;
  width: ${(props) => props.width};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${lato.style.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`;
