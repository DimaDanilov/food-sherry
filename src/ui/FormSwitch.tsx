import { colors, lato } from "@/styles/globalStyles";
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
    activeBtn == "left" ? colors.white : colors.mainColor;
  let rightMainColor: string =
    activeBtn == "left" ? colors.mainColor : colors.white;

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
  border: 2px solid ${colors.white};
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
  font-family: ${lato.style.fontFamily};
  font-size: 20px;
  font-weight: 400;
`;
