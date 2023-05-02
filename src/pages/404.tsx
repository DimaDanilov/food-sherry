import { Layout } from "@/components/layout/Layout";
import { ButtonCommon } from "@/ui/forms/buttons/ButtonCommon";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function NotFound() {
  const router = useRouter();

  const onGoHome = () => {
    router.push("/");
  };

  return (
    <Layout pageTitle="Not found" pageDescription="Something went wrong.">
      <Container>
        <Image src="/icons/logo_color.svg" width={129} height={179} alt="" />
        <PageInfo>
          <Title>404</Title>
          <p>Looks like you missed a page!</p>
          <ButtonCommon
            padding="10px"
            styleType="primary"
            value="Go_home"
            onClick={onGoHome}
          >
            Go Home
          </ButtonCommon>
        </PageInfo>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 50%;
  margin: 0 auto;
  padding: 10% 0;
`;
const PageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 50px;
`;
