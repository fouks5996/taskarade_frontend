import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";

export function useCurrentUser(jwt: string) {
  const { data, error, mutate } = useSWR(
    [path("current_user"), jwt],
    currentFetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
