import styled from "styled-components";
import { fillPaginatorValues } from "./utils";
import { COLORS } from "@/styles/globalStyles";
import { useRouter } from "next/router";

export interface IPaginatorProps {
  totalItems: number;
  currentPage: number;
}

const ITEMS_PER_PAGE: number = 10;

export default function Paginator({
  totalItems,
  currentPage,
}: IPaginatorProps) {
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
    ITEMS_PER_PAGE,
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

  return <PaginationContainer>{pageElements}</PaginationContainer>;
}

const PaginationContainer = styled.div`
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const PageBtn = styled.span<{ active: boolean; isNum: boolean }>`
  background-color: ${(props) => props.active && COLORS.mainColor};
  color: ${(props) => props.active && COLORS.white};
  padding: 7px;
  border-radius: 10px;
  cursor: ${(props) => props.isNum && "pointer"};
`;
