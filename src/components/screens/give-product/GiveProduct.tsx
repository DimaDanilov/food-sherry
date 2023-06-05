import { Container } from "@/ui/layout/Container";
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
import { CategoryModel } from "@/models/Category";
import { SIZES } from "@/styles/globalStyles";

type GiveProductScreenProps = {
  categories: CategoryModel[];
};

export const GiveProductScreen = observer(
  ({ categories }: GiveProductScreenProps) => {
    const authStore = useAuthStore();
    const giveProductStore = useGiveProductStore();
    const router = useRouter();

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let decodedImages: Array<string | ArrayBuffer | null> = [];
      giveProductStore.productImages.forEach((imageFile) => {
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async function () {
          try {
            decodedImages.push(reader.result);
            if (
              decodedImages.length === giveProductStore.productImages.length
            ) {
              try {
                giveProductStore.updateIsProductsLoading(true);
                await postProduct({
                  title: giveProductStore.productTitle,
                  category_id: giveProductStore.productSelect,
                  description: giveProductStore.productDescription,
                  amount: giveProductStore.productAmount,
                  time_to_take: new Date(
                    giveProductStore.productDatetimeToTake
                  ).toString(),
                  location: giveProductStore.productAddress,
                  images: decodedImages,
                  status: "open",
                });
                giveProductStore.reset();
                router.push("/save-product");
              } catch (e: any) {
                alert(e.response.data.message);
                console.error(e);
              }
            }
          } catch (error) {
            alert("Error");
            console.error("Error: ", error);
          }
        };
        reader.onerror = function (error) {
          console.error("Error: ", error);
        };
      });
    };

    useEffect(() => {
      if (authStore.firstLoadCompleted && !authStore.user.id) {
        router.replace("/login");
      }
    }, [authStore.user]);

    return !authStore.firstLoadCompleted || !authStore.user.id ? (
      <Loader />
    ) : (
      <Container>
        <Form action="" method="post" onSubmit={onFormSubmit}>
          <FieldsContainer>
            <GiveProductForm categories={categories} />
          </FieldsContainer>

          <PhotosContainer>
            <AddPhotoBlock />
          </PhotosContainer>
        </Form>
      </Container>
    );
  }
);

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${SIZES.tablet}) {
    flex-direction: column-reverse;
  }
`;

const FieldsContainer = styled.div`
  width: 50%;
  @media (max-width: ${SIZES.tablet}) {
    width: 100%;
  }
`;

const PhotosContainer = styled.div`
  width: 40%;
  @media (max-width: ${SIZES.tablet}) {
    width: 100%;
  }
`;
