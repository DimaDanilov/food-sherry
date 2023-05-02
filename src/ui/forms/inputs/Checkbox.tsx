import { CategoryModel } from "@/models/Category";
import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";

type CheckboxProps = {
  category: CategoryModel;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ category, checked, onChange }: CheckboxProps) => {
  return (
    <div>
      <StyledCheckbox
        type="checkbox"
        id={category.name}
        name={category.name}
        checked={checked}
        value={category.id}
        onChange={onChange}
      />
      <label htmlFor={category.name} style={{ color: COLORS.white }}>
        {category.name}{" "}
      </label>
    </div>
  );
};

const StyledCheckbox = styled.input`
  margin: 0 5px 0 0;
  accent-color: ${COLORS.mainHoverDark};
  &:hover {
    accent-color: ${COLORS.mainColor};
  }
  &:checked {
    outline: 0.5px solid ${COLORS.white};
  }
`;
