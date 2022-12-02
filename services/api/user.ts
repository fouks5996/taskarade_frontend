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
    isUserLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
}

export async function getUsers(jwt: string, value: string) {
  
  const data = await currentFetcher(path('getUsers', value), jwt)

  return {
    users: data,
  };
}
