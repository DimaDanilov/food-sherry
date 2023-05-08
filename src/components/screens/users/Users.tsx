import { UserShortData } from "@/api/UserAdapter";
import { COLORS } from "@/styles/globalStyles";
import { SearchInput } from "@/ui/forms/inputs/SearchInput";
import { Container } from "@/ui/layout/Container";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";
import { UserCard } from "./UserCard/UserCard";
import { Paginator } from "@/components/common/paginator/Paginator";

type UsersScreenProps = {
  usersData: UserShortData;
  page: number;
  search: string;
};

export const UsersScreen = ({ usersData, page, search }: UsersScreenProps) => {
  const router = useRouter();

  const [searchField, setSearchField] = useState<string>("");

  useEffect(() => {
    setSearchField(search);
  }, [search]);

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchField !== search) {
      if (searchField) {
        router.replace({
          query: { ...router.query, search: searchField },
        });
      } else {
        const { search, ...routerQuery } = router.query;
        router.replace({
          query: { ...routerQuery },
        });
      }
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <Container>
      <form action="" onSubmit={onSearchSubmit}>
        <SearchInput
          type="text"
          name="food_search"
          searchValue={searchField}
          searchOnChange={onSearchChange}
          icon={<HiOutlineMagnifyingGlass color={COLORS.gray} />}
          iconScale={1.3}
        />
      </form>
      <CardsContainer>
        {usersData.users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </CardsContainer>
      <Paginator
        totalItems={usersData.totalCount}
        currentPage={page}
        itemsPerPage={8}
      />
    </Container>
  );
};

const CardsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 3vh;
  margin: 30px auto;
`;
