import { Container } from "@/ui/Container";
import styled from "styled-components";
import { GiveFoodForm } from "./give-food-sections/GiveFoodForm";
import AddPhotoBlock from "./give-food-sections/AddPhotoBlock";

export default function GiveFoodScreen() {
  return (
    <PageContainer>
      <FormContainer>
        <GiveFoodForm />
      </FormContainer>

      <PhotosContainer>
        <AddPhotoBlock />
      </PhotosContainer>
    </PageContainer>
  );
}

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const FormContainer = styled.div`
  width: 50%;
`;
const PhotosContainer = styled.div`
  width: 40%;
`;
