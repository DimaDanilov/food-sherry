import { lato } from "@/styles/fonts";
import styled from "styled-components";

interface ILoginSwitchProps {
  activeBtn: "left" | "right";
  leftText: string;
  rightText: string;
}

interface ISwitchElementProps {
  bgColor: string;
  borderRadius: string;
}

export function LoginSwitch({
  activeBtn,
  leftText,
  rightText,
}: ILoginSwitchProps) {
  let leftMainColor: string = activeBtn == "left" ? "white" : "#289672";
  let rightMainColor: string = activeBtn == "left" ? "#289672" : "white";

  return (
    <Container>
      <SwitchElement bgColor={leftMainColor} borderRadius="10px 0 0 10px">
        <Text textColor={rightMainColor}>{leftText}</Text>
      </SwitchElement>
      <SwitchElement bgColor={rightMainColor} borderRadius="0 10px 10px 0">
        <Text textColor={leftMainColor}>{rightText}</Text>
      </SwitchElement>
    </Container>
  );
}

const Container = styled.div`
  height: 50px;
  display: flex;
`;

const SwitchElement = styled.div<ISwitchElementProps>`
  border: 2px solid white;
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
