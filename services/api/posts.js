import { path } from "../routes";
import useSWR from "swr";
import { fetcher } from "../config";

export function usePosts() {
  const { data, error, mutate } = useSWR(path("all_posts"), fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
