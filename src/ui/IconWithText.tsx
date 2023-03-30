import { lato } from "@/styles/globalStyles";
import Image from "next/image";
import styled from "styled-components";

type TIconWithText = {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  fontSize: number;
  children: React.ReactNode;
};

type TText = {
  fontSize: string;
};

export function IconWithText({
  icon,
  iconWidth,
  iconHeight,
  fontSize,
  children,
}: TIconWithText) {
  return (
    <Container>
      <Image src={icon} alt="" width={iconWidth} height={iconHeight} />
      <Text fontSize={fontSize + "px"}>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px auto;
`;
const Text = styled.p<TText>`
  font-family: ${lato.style.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
`;
