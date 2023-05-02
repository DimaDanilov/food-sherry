import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { Icon } from "./Icon";

type ButtonIconProps = {
  icon: JSX.Element;
  iconScale?: number;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ButtonIcon = ({
  icon,
  iconScale,
  active,
  onClick,
}: ButtonIconProps) => {
  return (
    <StyledButton onClick={onClick} active={active}>
      <Icon icon={icon} iconScale={iconScale} />
    </StyledButton>
  );
};

type StyledButtonProps = {
  active: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  transition: 0.3s;
  color: ${(props) => (props.active ? COLORS.white : COLORS.mainColor)};
  border: 1px solid;
  border-radius: 10px;
  border-color: ${(props) =>
    props.active ? COLORS.mainHoverLight : "transparent"};
  background-color: ${(props) =>
    props.active ? COLORS.mainHoverLight : "transparent"};
  padding: 8px 11px;
  cursor: pointer;
  &:hover {
    color: ${COLORS.white};
    background-color: ${COLORS.mainHoverLight};
    border-color: ${COLORS.mainHoverLight};
  }
`;
