import styled from "styled-components";

export function Icon({
  className,
  icon,
  iconScale,
}: {
  className?: string;
  icon: React.ReactNode;
  iconScale?: number;
}) {
  return (
    <Container iconScale={iconScale} className={className}>
      {icon}
    </Container>
  );
}

const Container = styled.div<{ iconScale?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    scale: ${(props) => props.iconScale};
  }
`;
