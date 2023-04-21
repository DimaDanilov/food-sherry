import { Container } from "@/ui/Container";
import styled from "styled-components";
import { GiveProductForm } from "./give-product-sections/GiveProductForm";
import { AddPhotoBlock } from "./give-product-sections/AddPhotoBlock";
import { postProduct } from "@/api/ProductApi";
import { useGiveProductStore } from "./store/GiveProductStore";
import { useRouter } from "next/router";

export default function GiveProductScreen() {
  const giveProductStore = useGiveProductStore();
  const router = useRouter();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postProduct({
        title: giveProductStore.productTitle,
        author: "ТЕСТОВОЕ ИМЯ", // ДОРАБОТАТЬ
        category_id: giveProductStore.productSelect,
        description: giveProductStore.productDescription,
        amount: giveProductStore.productAmount,
        time_created: new Date().toISOString(),
        time_to_take: giveProductStore.productDatetimeToTake,
        location: giveProductStore.productAddress,
        phone: "ТЕСТОВЫЙ ТЕЛЕФОН", // ДОРАБОТАТЬ
        images: giveProductStore.productImages,
        status: "open",
      });
      giveProductStore.reset();
      router.push("/save-product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <Form action="" method="post" onSubmit={onFormSubmit}>
        <FieldsContainer>
          <GiveProductForm />
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