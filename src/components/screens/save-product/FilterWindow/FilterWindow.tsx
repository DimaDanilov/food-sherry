import { CategoryModel } from "@/models/Category";
import { COLORS } from "@/styles/globalStyles";
import { ButtonCommon } from "@/ui/forms/buttons/ButtonCommon";
import { Checkbox } from "@/ui/forms/inputs/Checkbox";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import styled from "styled-components";

type FilterWindowProps = {
  availableCategories: CategoryModel[];
  categoriesQuery: string[];
  isActive: boolean;
};

export const FilterWindow = ({
  availableCategories,
  categoriesQuery,
  isActive,
}: FilterWindowProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(categoriesQuery);

  const onFilterCheckboxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (categories.includes(event.target.value)) {
        setCategories(categories.filter((el) => el !== event.target.value));
      } else {
        setCategories([...categories, event.target.value]);
      }
    },
    [categories]
  );

  return (
    <Window isActive={isActive}>
      <Grid>
        {availableCategories.map((el) => {
          return (
            <Checkbox
              key={el.id}
              category={el}
              checked={categories.includes(el.id.toString())}
              onChange={onFilterCheckboxClick}
            />
          );
        })}
      </Grid>
      <ButtonCommon
        styleType="secondary"
        padding="10px 5px"
        onClick={() => {
          router.replace({
            query: { ...router.query, category: categories },
          });
        }}
      >
        Отфильтровать
      </ButtonCommon>
    </Window>
  );
};

type WindowProps = {
  isActive: boolean;
};

const Window = styled.div<WindowProps>`
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
