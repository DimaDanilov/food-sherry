import { Container } from "@/ui/Container";
import styled from "styled-components";
import { GiveFoodForm } from "./give-food-sections/GiveFoodForm";
import { AddPhotoBlock } from "./give-food-sections/AddPhotoBlock";
import { postProduct } from "@/api/FoodApi";
import { useGiveFoodStore } from "./store/GiveFoodStore";
import { useRouter } from "next/router";

export default function GiveFoodScreen() {
  const giveFoodStore = useGiveFoodStore();
  const router = useRouter();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postProduct({
        title: giveFoodStore.productTitle,
        author: "ТЕСТОВОЕ ИМЯ", // ДОРАБОТАТЬ
        category_id: giveFoodStore.productSelect,
        description: giveFoodStore.productDescription,
        amount: giveFoodStore.productAmount,
        time_created: new Date().toISOString(),
        time_to_take: giveFoodStore.productDatetimeToTake,
        location: giveFoodStore.productAddress,
        phone: "ТЕСТОВЫЙ ТЕЛЕФОН", // ДОРАБОТАТЬ
        images: giveFoodStore.productImages,
        status: "open",
      });
      giveFoodStore.reset();
      router.push("/save-food");
    } catch (error) {
      console.log(error);
    }
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
