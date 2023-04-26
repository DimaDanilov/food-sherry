import { useAuthStore } from "@/store/AuthStore";
import { COLORS } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function HomeScreen() {
  const router = useRouter();
  const authStore = useAuthStore();

  const handleClick = () =>
    router.push(
      authStore.user.email ? `/profile/${authStore.user.id}` : "/login"
    );

  return (
    <>
      <Background
        alt=""
        src={"/images/landing_background.jpg"}
        width={200}
        height={200}
      />
      <BackgroundOverlay />
      <PageContent>
        <FoodSharingInfoContainer>
          <Title>ФУДШЕРИНГ</Title>
          <Description>
            Спасайте еду вместе с нами. Заботимся об окружающей среде и помогаем
            людям
          </Description>
          <Button
            padding="20px"
            width="70%"
            styleType="primary"
            onClick={handleClick}
          >
            Присоединиться
          </Button>
        </FoodSharingInfoContainer>
      </PageContent>
    </>
  );
}

const Background = styled(Image)`
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.shadowLanding}; /* прозрачный красный цвет */
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
  color: ${COLORS.white};
`;
const Title = styled.h1`
  font-size: 54px;
`;
const Description = styled.h2`
  font-size: 24px;
`;
