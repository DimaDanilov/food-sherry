import styled from "styled-components";

type IconProps = {
  className?: string;
  icon: React.ReactNode;
  iconScale?: number;
};

export const Icon = ({ className, icon, iconScale }: IconProps) => {
  return (
    <Container iconScale={iconScale} className={className}>
      {icon}
    </Container>
  );
};

type ContainerProps = {
  iconScale?: number;
};

const Container = styled.span<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    scale: ${(props) => props.iconScale};
  }
`;
