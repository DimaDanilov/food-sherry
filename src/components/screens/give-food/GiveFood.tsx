import { Container } from "@/ui/Container";
import styled from "styled-components";
import { GiveFoodForm } from "./give-food-sections/GiveFoodForm";
import AddPhotoBlock from "./give-food-sections/AddPhotoBlock";
import { postProduct } from "@/api/FoodRest";
import { useGiveFoodStore } from "./store/GiveFoodStore";
import { categoriesList } from "@/fake-data/categoriesList";

export default function GiveFoodScreen() {
  const giveFoodStore = useGiveFoodStore();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postProduct({
      title: giveFoodStore.productTitle,
      author: "ТЕСТОВОЕ ИМЯ",
      category: categoriesList[giveFoodStore.productSelect],
      description: giveFoodStore.productDescription,
      amount: giveFoodStore.productAmount,
      time_created: "СЕЙЧАС", // ДОРАБОТАТЬ
      time_to_take: "СЕЙЧАС", // ДОРАБОТАТЬ
      location: giveFoodStore.productAddress,
      phone: "ТЕСТОВЫЙ ТЕЛЕФОН", // ДОРАБОТАТЬ
      image_src: "", // ДОРАБОТАТЬ
      status: "closed", // ДОРАБОТАТЬ
    });
  };

  return (
    <PageContainer>
      <Form action="" method="post" onSubmit={onFormSubmit}>
        <FieldsContainer>
          <GiveFoodForm />
        </FieldsContainer>

        <PhotosContainer>
          <AddPhotoBlock />
        </PhotosContainer>
      </Form>
    </PageContainer>
  );
}

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FieldsContainer = styled.div`
  width: 50%;
`;
const PhotosContainer = styled.div`
  width: 40%;
`;
