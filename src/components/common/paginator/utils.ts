import { PaginatorProps } from "./Paginator";

export function fillPaginatorValues({
  totalItems,
  currentPage,
  itemsPerPage,
}: PaginatorProps): Array<string> {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  switch (true) {
    case !Number(totalPages):
      return [];
    case totalPages <= 7:
      let arr: Array<string> = [];
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i.toString());
      }
      return arr;
    case currentPage === 1:
    case currentPage === 2:
      return ["1", "2", "3", "...", totalPages.toString()];
    case currentPage === 3:
      return ["1", "2", "3", "4", "...", totalPages.toString()];
    case 2 < currentPage && currentPage < totalPages - 2:
      return [
        "1",
        "...",
        (currentPage - 1).toString(),
        currentPage.toString(),
        (currentPage + 1).toString(),
        "...",
        totalPages.toString(),
      ];
    case currentPage === totalPages - 2:
      return [
        "1",
        "...",
        (totalPages - 3).toString(),
        (totalPages - 2).toString(),
        (totalPages - 1).toString(),
        totalPages.toString(),
      ];
    case currentPage === totalPages - 1:
    case currentPage === totalPages:
      return [
        "1",
        "...",
        (totalPages - 2).toString(),
        (totalPages - 1).toString(),
        totalPages.toString(),
      ];
    default:
      return [];
  }
}
