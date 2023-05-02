import { Container } from "@/ui/Container";
import styled from "styled-components";
import { GiveProductForm } from "./give-product-sections/GiveProductForm";
import { AddPhotoBlock } from "./give-product-sections/AddPhotoBlock";
import { postProduct } from "@/api/ProductApi";
import { useGiveProductStore } from "./store/GiveProductStore";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";
import { Loader } from "@/components/layout/Loader";
import { observer } from "mobx-react";

export const GiveProductScreen = observer(() => {
  const authStore = useAuthStore();
  const giveProductStore = useGiveProductStore();
  const router = useRouter();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postProduct({
        title: giveProductStore.productTitle,
        category_id: giveProductStore.productSelect,
        description: giveProductStore.productDescription,
        amount: giveProductStore.productAmount,
        time_to_take: giveProductStore.productDatetimeToTake,
        location: giveProductStore.productAddress,
        images: giveProductStore.productImages,
        status: "open",
      });
      giveProductStore.reset();
      router.push("/save-product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authStore.firstLoadCompleted && !authStore.user.id) {
      router.replace("/login");
    }
  }, [authStore.user]);

  return !authStore.firstLoadCompleted || !authStore.user.id ? (
    <Loader />
  ) : (
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
});

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
