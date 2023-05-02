import styled from "styled-components";
import { fillPaginatorValues } from "./utils";
import { COLORS } from "@/styles/globalStyles";
import { useRouter } from "next/router";

export type PaginatorProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

export const Paginator = ({
  totalItems,
  currentPage,
  itemsPerPage,
}: PaginatorProps) => {
  const router = useRouter();

  function onPaginatorBtnClick(pageNum: string) {
    // Check if pageNum doesn't equal "..."
    if (Number(pageNum)) {
      router.replace({
        query: { ...router.query, page: pageNum },
      });
    }
  }

  const pages: Array<string> = fillPaginatorValues({
    totalItems,
    currentPage,
    itemsPerPage,
  });

  const pageElements = pages.map((page, index) => (
    <PageBtn
      key={index}
      active={page === currentPage.toString()}
      isNum={Number(page) ? true : false}
      onClick={() => onPaginatorBtnClick(page)}
    >
      {page}
    </PageBtn>
  ));

  return (
    <PaginationContainer>
      {pageElements.length > 1 && pageElements}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
`;

type PageBtnProps = {
  active: boolean;
  isNum: boolean;
};

const PageBtn = styled.span<PageBtnProps>`
  background-color: ${(props) => props.active && COLORS.mainColor};
  color: ${(props) => props.active && COLORS.white};
  padding: 7px;
  border-radius: 10px;
  cursor: ${(props) => props.isNum && "pointer"};
`;
