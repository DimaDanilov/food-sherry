import { COLORS } from "@/styles/globalStyles";
import React from "react";
import styled from "styled-components";

type ButtonProps = {
  width?: string;
  margin?: string;
  padding?: string;

  styleType: "primary" | "secondary";

  children: string;
  [x: string]: any;
};

export const Button = ({
  width,
  margin,
  padding,
  styleType,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      width={width || "100%"}
      margin={margin || "0 auto"}
      padding={padding}
      bgColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      bgColorHover={
        styleType === "primary" ? COLORS.mainHoverDark : COLORS.secondaryHover
      }
      color={styleType === "primary" ? COLORS.white : COLORS.mainColor}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

type StyledButtonProps = {
  width: string;
  margin: string;
  padding?: string;
  bgColor: string;
  bgColorHover: string;
  color: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  transition: 0.3s;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: none;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.bgColorHover};
  }
`;
