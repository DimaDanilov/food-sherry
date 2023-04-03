import styled from "styled-components";
import { PropsWithChildren } from "react";

export const Container = ({ children, ...props }: PropsWithChildren) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 5vh 0;
`;
