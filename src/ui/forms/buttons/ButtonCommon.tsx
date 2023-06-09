import { COLORS } from "@/styles/globalStyles";
import React from "react";
import styled from "styled-components";

type ButtonCommonProps = {
  width?: string;
  margin?: string;
  padding?: string;
  disabled?: boolean;

  styleType: "primary" | "secondary";

  children: string;
  [x: string]: any;
};

export const ButtonCommon = ({
  width,
  margin,
  padding,
  styleType,
  children,
  disabled,
  ...props
}: ButtonCommonProps) => {
  return (
    <StyledButton
      width={width}
      margin={margin || "0 auto"}
      padding={padding}
      bgColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      bgColorHover={
        styleType === "primary" ? COLORS.mainHoverDark : COLORS.secondaryHover
      }
      color={styleType === "primary" ? COLORS.white : COLORS.mainColor}
      {...props}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

type StyledButtonProps = {
  width?: string;
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
  overflow: hidden;
  &:hover {
    background-color: ${(props) => props.bgColorHover};
  }
`;
