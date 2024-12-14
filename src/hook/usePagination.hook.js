import { useCallback, useState } from "react";
import useSWR from "swr";

export function usePagination(key, query, fetcher, inverted) {
  const [isLoadMore] = useState(false);

  const callback = useCallback(() => {
    return fetcher({ ...query });
  }, [JSON.stringify({ ...query })]);

  const { data, error, isValidating, isLoading, mutate } = useSWR(
    key,
    callback,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
    }
  );

  const loadMore = useCallback(async () => {
    // if (data && data?.count < data?.totalDocs) {
    //   setIsLoadMore(true);
    //   const updateData = await fetcher({
    //     ...{...query,projectId:1},
    //     offset: data?.count || 0,
    //   });
    //   mutate(
    //     (prevData: ResponsePagination<T> | undefined) => {
    //       if (!prevData) {
    //         return undefined;
    //       }
    //       return {
    //         ...updateData,
    //         docs: inverted ? [...updateData.rows, ...prevData.rows] : [...prevData.rows, ...updateData.rows],
    //       };
    //     },
    //     { revalidate: false },
    //   );
    //   setIsLoadMore(false);
    // }
  }, [data, { ...query }, mutate, fetcher, inverted]);

  /**
   * This callback wile be refresh data
   */
  const refresh = useCallback(async () => {
    const updateData = await fetcher({
      ...query,
    });
    mutate(updateData, { revalidate: false });
  }, [fetcher, mutate, JSON.stringify(query)]);

  /**
   * This callback wile be reload data
   */
  const reload = useCallback(async () => {
    // const updateData = await fetcher({ ...query });

    mutate();
  }, [fetcher, mutate, { ...query }]);

  return {
    data,
    isLoading: isLoading,
    isError: !!error,
    loadMore,
    isLoadMore,
    refresh,
    reload,
    isValidating,
  };
}
