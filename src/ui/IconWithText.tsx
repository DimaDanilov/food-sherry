import styled from "styled-components";
import { Icon } from "./Icon";

type TIconWithText = {
  icon: JSX.Element;
  iconScale?: number;
  children: React.ReactNode;
  hideStringsExcept?: number;
};

export function IconWithText({
  icon,
  iconScale,
  children,
  hideStringsExcept,
}: TIconWithText) {
  return (
    <Container>
      <Icon icon={icon} iconScale={iconScale} />
      <Text hideStringsExcept={hideStringsExcept}>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px auto;
`;

const Text = styled.p<{ hideStringsExcept?: number }>`
  /* Hide text when overflow more than N lines */
  overflow: ${(props) => props.hideStringsExcept && "hidden"};
  display: ${(props) => props.hideStringsExcept && "-webkit-box"};
  -webkit-line-clamp: ${(props) =>
    props.hideStringsExcept}; /* number of lines to show */
  line-clamp: ${(props) => props.hideStringsExcept};
  -webkit-box-orient: ${(props) => props.hideStringsExcept && "vertical"};
`;
