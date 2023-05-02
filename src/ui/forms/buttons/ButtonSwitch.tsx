import { COLORS } from "@/styles/globalStyles";
import Link from "next/link";
import styled from "styled-components";

type ButtonSwitchProps = {
  activeBtn: "left" | "right";
  leftText: string;
  rightText: string;
  link: string;
};

export const ButtonSwitch = ({
  activeBtn,
  leftText,
  rightText,
  link,
}: ButtonSwitchProps) => {
  let leftMainColor: string =
    activeBtn == "left" ? COLORS.white : COLORS.mainColor;
  let rightMainColor: string =
    activeBtn == "left" ? COLORS.mainColor : COLORS.white;

  return (
    <ContainerLink href={link}>
      <SwitchElement bgColor={leftMainColor} borderRadius="10px 0 0 10px">
        <Text textColor={rightMainColor}>{leftText}</Text>
      </SwitchElement>
      <SwitchElement bgColor={rightMainColor} borderRadius="0 10px 10px 0">
        <Text textColor={leftMainColor}>{rightText}</Text>
      </SwitchElement>
    </ContainerLink>
  );
};

const ContainerLink = styled(Link)`
  height: 50px;
  display: flex;
  text-decoration: none;
`;

interface SwitchElementProps {
  bgColor: string;
  borderRadius: string;
}

const SwitchElement = styled.div<SwitchElementProps>`
  border: 2px solid ${COLORS.white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
`;

interface TextProps {
  textColor: string;
}

const Text = styled.p<TextProps>`
  margin: auto;
  color: ${(props) => props.textColor};
`;
