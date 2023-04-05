import { COLORS } from "@/styles/globalStyles";
import React from "react";
import styled from "styled-components";

type TButton = {
  width?: string;
  margin?: string;
  padding?: string;

  styleType: "primary" | "secondary";

  children: string;
  [x: string]: any;
};

export default function Button({
  width,
  margin,
  padding,
  styleType,
  children,
  ...props
}: TButton) {
  return (
    <StyledButton
      width={width || "100%"}
      margin={margin || "0 auto"}
      padding={padding}
      bgColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      color={styleType === "primary" ? COLORS.white : COLORS.mainColor}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

interface IStyledBtnProps {
  width: string;
  margin: string;
  padding?: string;
  bgColor: string;
  color: string;
}

const StyledButton = styled.button<IStyledBtnProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: none;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: 10px;
  cursor: pointer;
`;
