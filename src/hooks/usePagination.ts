
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const usePagination = <T,>(
  currentPage: number,
  maxPage: number,
  queryFn: Function,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  tag: string,
) => {
  const QueryClient = useQueryClient()

  const queryData = useQuery<T>({
    queryKey: [tag, currentPage],
    queryFn: () => queryFn(currentPage),
    //haw mach time will pass untik we want a refetch
    staleTime: 2000,
  });

  useEffect(() => {
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      QueryClient.prefetchQuery({
        queryKey: [tag, nextPage],
        queryFn: () => queryFn(nextPage),
      });
    }
  }, [currentPage, QueryClient]);

  const add1Page = () => {
    console.log("ho");

    if (currentPage < maxPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return { queryData, add1Page }


}