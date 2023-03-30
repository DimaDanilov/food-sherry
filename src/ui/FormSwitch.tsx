import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import Link from "next/link";
import styled from "styled-components";

interface ILoginSwitchProps {
  activeBtn: "left" | "right";
  leftText: string;
  rightText: string;
  link: string;
}

interface ISwitchElementProps {
  bgColor: string;
  borderRadius: string;
}

export function FormSwitch({
  activeBtn,
  leftText,
  rightText,
  link,
}: ILoginSwitchProps) {
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
}

const ContainerLink = styled(Link)`
  height: 50px;
  display: flex;
  text-decoration: none;
`;

const SwitchElement = styled.div<ISwitchElementProps>`
  border: 2px solid ${COLORS.white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
`;
const Text = styled.span<{ textColor: string }>`
  margin: auto;
  color: ${(props) => props.textColor};
  font-size: ${FONT_SIZE.p};
`;
