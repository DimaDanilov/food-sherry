import { Container } from "@/ui/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { useMemo } from "react";
import { ProfileInfo } from "./profile-sections/ProfileInfo";
import { IUser } from "@/models/User";
import { useRouter } from "next/router";
import { ProductProfileFilter } from "@/models/Product";

interface ProfileScreenProps {
  user: IUser;
  totalProducts: number;
}

export default function ProfileScreen({
  user,
  totalProducts,
}: ProfileScreenProps) {
  const router = useRouter();

  const queryAds: ProductProfileFilter | undefined = useMemo(() => {
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
}

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ProfileInfoContainer = styled.div`
  width: 25%;
`;
const ProfileProductsContainer = styled.div`
  width: 65%;
`;
