import { SIZES } from "@/styles/globalStyles";
import { Container } from "@/ui/layout/Container";
import Image from "next/image";
import styled from "styled-components";

export const AboutUsScreen = () => {
  return (
    <PageContainer>
      <MainContent>
        <Title>О нас</Title>
        <Description>
          Наш сайт занимается борьбой с проблемой продовольственных отходов. Мы
          работаем с продуктами, которые еще можно использовать, и помогаем
          людям ими обмениваться.
        </Description>
        <Description>
          Присоединяйтесь к нам и помогите сделать мир более устойчивым!
        </Description>
      </MainContent>

      <FlexBlock>
        <BlockContent>
          <BlockTitle>Обмен продуктами между пользователями</BlockTitle>
          <BlockDescription>
            Наша платформа предоставляет возможность обмена едой между
            пользователями.
          </BlockDescription>
          <BlockDescription>
            Это означает, что если у вас есть лишняя еда, которую вы не
            собираетесь использовать, то вы можете разместить ее на нашей
            платформе и поделиться ею с теми, кто нуждается в питании. И
            наоборот если вы нуждаетесь в еде, вы можете выбрать интересующие
            вас продукты питания и забрать их.
          </BlockDescription>
          <BlockDescription>
            Мы считаем, что подобное сотрудничество между людьми может оказаться
            весьма важным в нашей современной жизни.
          </BlockDescription>
        </BlockContent>
        <BlockImage
          width={350}
          height={385}
          src={"/images/about_us_users.jpg"}
          alt="About Us Image"
        />
      </FlexBlock>

      <FlexBlock isReversed>
        <BlockContent>
          <BlockTitle>Сотрудничество с компаниями</BlockTitle>
          <BlockDescription>
            Мы работаем в тесном сотрудничестве с ресторанами, магазинами и
            другими компаниями, чтобы спасти как можно больше продуктов от
            выброса.
          </BlockDescription>
          <BlockDescription>
            Каждый день многие компании оставляют на свалках огромные количества
            еды, которые могли бы пойти на благотворительные нужды. Но многие из
            них не знают, как это сделать, или не могут найти подходящих
            партнеров для реализации такой идеи.
          </BlockDescription>
          <BlockDescription>
            Фудшеринг — это платформа, которая связывает компании, которые
            готовы отдавать свои продукты питания, с теми, кто нуждается в них.
          </BlockDescription>
        </BlockContent>
        <BlockImage
          width={360}
          height={240}
          src={"/images/about_us_companies.jpg"}
          alt="About Us Image"
        />
      </FlexBlock>

      <FlexBlock>
        <BlockContent>
          <BlockTitle>Сообщество</BlockTitle>
          <BlockDescription>
            Фудшеринг — это сообщество людей, которые действуют вместе, чтобы
            помочь друг другу и сделать мир лучше. Это позволяет людям не только
            получать продукты, но и общаться друг с другом, делиться опытом и
            узнавать новых людей.
          </BlockDescription>
          <BlockDescription>
            Благодаря участию в Фудшеринге вы можете стать частью движения за
            более экологичный и устойчивый мир, найти единомышленников и сделать
            мир лучше.
          </BlockDescription>
        </BlockContent>
        <BlockImage
          width={360}
          height={240}
          src={"/images/about_us_community.jpg"}
          alt="About Us Image"
        />
      </FlexBlock>
    </PageContainer>
  );
};

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin: 0 auto;
  width: 80%;
`;
const Title = styled.h1`
  text-align: center;
`;
const Description = styled.p`
  text-align: justify;
`;

type FlexBlockProps = {
  isReversed?: boolean;
};

const FlexBlock = styled.div<FlexBlockProps>`
  display: flex;
  flex-direction: ${({ isReversed }) => (isReversed ? "row-reverse" : "row")};
  justify-content: space-between;
  gap: 30px;
  @media (max-width: ${SIZES.tablet}) {
    flex-direction: column;
  }
`;
const BlockContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
const BlockTitle = styled.h2``;
const BlockDescription = styled.p`
  text-align: justify;
`;
const BlockImage = styled(Image)`
  border-radius: 15px;
  max-width: 100%;
  object-fit: cover;
  @media (max-width: ${SIZES.tablet}) {
    margin: 0 auto;
  }
`;
