import { ICategory } from "@/models/Category";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

interface CategoryCheckboxProps {
  category: ICategory;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterWindowProps {
  availableCategories: ICategory[];
  categoriesQuery: string[];
  isActive: boolean;
}

const CategoryCheckbox = ({
  category,
  checked,
  onChange,
}: CategoryCheckboxProps) => {
  return (
    <div>
      <Input
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

export default function FilterWindow({
  availableCategories,
  categoriesQuery,
  isActive,
}: FilterWindowProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(categoriesQuery);

  const onFilterCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (categories.includes(event.target.value)) {
      setCategories(categories.filter((el) => el !== event.target.value));
    } else {
      setCategories([...categories, event.target.value]);
    }
  };

  return (
    <Window isActive={isActive}>
      <Grid>
        {availableCategories.map((el) => {
          return (
            <CategoryCheckbox
              key={el.id}
              category={el}
              checked={categories.includes(el.id.toString())}
              onChange={onFilterCheckboxClick}
            />
          );
        })}
      </Grid>
      <Button
        styleType="secondary"
        padding="10px 5px"
        onClick={() => {
          router.replace({
            query: { ...router.query, category: categories },
          });
        }}
      >
        Отфильтровать
      </Button>
    </Window>
  );
}

const Window = styled.div<{ isActive: boolean }>`
  width: 600px;
  padding: 15px;
  margin-bottom: 20px;
  border: 2px solid ${COLORS.mainColor};
  border-radius: 10px 0 10px 10px;
  display: ${(props) => (props.isActive ? "flex " : "none")};
  flex-direction: column;
  gap: 20px;
  background-color: ${COLORS.mainColor};
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const Input = styled.input`
  margin: 0 5px 0 0;
  accent-color: ${COLORS.mainHoverDark};
  &:hover {
    accent-color: ${COLORS.mainColor};
  }
  &:checked {
    outline: 0.5px solid ${COLORS.white};
  }
`;
