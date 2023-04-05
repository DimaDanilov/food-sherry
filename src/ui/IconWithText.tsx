import styled from "styled-components";
import { Icon } from "./Icon";

type TIconWithText = {
  icon: JSX.Element;
  iconScale?: number;
  children: React.ReactNode;
};

export function IconWithText({ icon, iconScale, children }: TIconWithText) {
  return (
    <Container>
      <Icon icon={icon} iconScale={iconScale} />
      <p>{children}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px auto;
`;
