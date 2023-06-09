import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { Icon } from "../../layout/Icon";

type SearchInputProps = {
  type: string;
  name: string;
  searchValue?: string;
  searchOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: JSX.Element;
  iconScale?: number;
  required?: boolean;
};

export const SearchInput = ({
  type,
  name,
  searchValue,
  searchOnChange,
  placeholder,
  icon,
  iconScale,
  required,
}: SearchInputProps) => {
  return (
    <Container>
      <StyledIcon icon={icon} iconScale={iconScale} />
      <Input
        type={type}
        name={name}
        id={name}
        value={searchValue}
        onChange={searchOnChange}
        placeholder={placeholder}
        required={required}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  width: 40px;
  height: 100%;
  top: 0;
  left: 5px;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 45px;
  border-radius: 20px;
  border: 2px solid ${COLORS.lightgray};
  :focus {
    outline: none;
    border-color: ${COLORS.gray};
  }
`;
