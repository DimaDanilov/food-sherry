import { colors, lato } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import PageTemplate from "@/ui/PageTemplate";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  const handleClick = () => router.push("/login");

  return (
    <PageTemplate>
      <Background />
      <PageContent>
        <FoodSharingInfoContainer>
          <Title>ФУДШЕРИНГ</Title>
          <Description>
            Спасайте еду вместе с нами. Заботимся об окружающей среде и помогаем
            людям
          </Description>
          <Button
            fontSize={20}
            padding="20px"
            width="70%"
            styleType="primary"
            onClick={handleClick}
          >
            Присоединиться
          </Button>
        </FoodSharingInfoContainer>
      </PageContent>
    </PageTemplate>
  );
}

const Background = styled.div`
  content: "";
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url("/images/landing_background.jpg");
  box-shadow: inset 0 0 0 2000px ${colors.shadowLanding};
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
`;

const PageContent = styled.div`
  height: 92vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FoodSharingInfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
  color: ${colors.white};
`;
const Title = styled.h1`
  font-family: ${lato.style.fontFamily};
  font-size: 60px;
  font-weight: 400;
`;
const Description = styled.h2`
  font-family: ${lato.style.fontFamily};
  font-size: 28px;
  font-weight: 400;
`;
