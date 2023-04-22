import { Container } from "@/ui/Container";
import styled from "styled-components";
import { ProfileProducts } from "./profile-sections/ProfileProducts";
import { useMemo } from "react";
import { ProfileInfo } from "./profile-sections/ProfileInfo";
import { IUser } from "@/models/User";
import { useRouter } from "next/router";

export default function ProfileScreen({ user }: { user: IUser }) {
  const router = useRouter();

  const queryAds: "current" | "closed" | "taken" = useMemo(() => {
    if (!router.isReady) return "current";
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
        <ProfileInfo user={user} />
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
