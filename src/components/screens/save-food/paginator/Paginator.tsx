import styled from "styled-components";
import { fillPaginatorValues } from "./utils";

export interface IPaginatorProps {
  totalItems: number;
  currentPage: number;
}

export default function Paginator({
  totalItems,
  currentPage,
}: IPaginatorProps) {
  const ITEMS_PER_PAGE: number = 10;
  const pages: Array<string> = fillPaginatorValues({
    totalItems,
    currentPage,
    ITEMS_PER_PAGE,
  });
  const pageElements = pages.map((page, index) => (
    <span key={index}>{page}</span>
  ));

  return <PaginationContainer>{pageElements}</PaginationContainer>;
}

const PaginationContainer = styled.div`
  width: 20%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
