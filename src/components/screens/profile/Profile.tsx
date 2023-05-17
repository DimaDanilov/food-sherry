import { Container } from "@/ui/layout/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { useMemo } from "react";
import { ProfileInfo } from "./profile-sections/ProfileInfo";
import { UserModel } from "@/models/User";
import { useRouter } from "next/router";
import { ProfileProductFilterType } from "@/models/Product";
import { SIZES } from "@/styles/globalStyles";

type ProfileScreenProps = {
  user: UserModel;
  totalProducts: number;
};

export const ProfileScreen = ({ user, totalProducts }: ProfileScreenProps) => {
  const router = useRouter();

  const queryAds: ProfileProductFilterType | undefined = useMemo(() => {
    if (!router.isReady) return undefined;
    if (router.query.ads === "closed" || router.query.ads === "taken") {
      return router.query.ads;
    } else {
      return "current";
    }
  }, [router.isReady, router.query.ads]);

  const queryPage: string | undefined = useMemo(() => {
    if (!router.isReady) return;
    if (Number(router.query.page) > 0) {
      return router.query.page?.toString();
    } else {
      router.replace({
        query: { ...router.query, page: 1 },
      });
      return "1";
    }
  }, [router.isReady, router.query.page]);

  return (
    <PageContainer>
      <ProfileInfoContainer>
        <ProfileInfo user={user} totalProducts={totalProducts} />
      </ProfileInfoContainer>
      <ProfileProductsContainer>
        <ProfileProducts
          userId={user.id}
          queryAds={queryAds}
          queryPage={queryPage}
        />
      </ProfileProductsContainer>
    </PageContainer>
  );
};

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  @media (max-width: ${SIZES.tablet}) {
    flex-direction: column;
  }
`;

const ProfileInfoContainer = styled.div`
  width: 25%;
  @media (max-width: ${SIZES.tablet}) {
    width: 100%;
  }
`;

const ProfileProductsContainer = styled.div`
  width: 65%;
  @media (max-width: ${SIZES.tablet}) {
    width: 100%;
  }
`;
