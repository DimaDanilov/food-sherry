import styled from "styled-components";
import { Icon } from "./Icon";

type TIconWithText = {
  icon: JSX.Element;
  iconScale?: number;
  fontSize: string;
  children: React.ReactNode;
};

export function IconWithText({
  icon,
  iconScale,
  fontSize,
  children,
}: TIconWithText) {
  return (
    <Container>
      <Icon icon={icon} iconScale={iconScale} />
      <Text fontSize={fontSize}>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px auto;
`;
const Text = styled.p<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
`;
