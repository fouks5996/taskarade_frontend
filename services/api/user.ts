import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function useCurrentUser(jwt: string) {
  let options = {	
    method: "GET",
    headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
    },
  }   
  const { data, error, mutate } = useSWR([path("current_user"), options], fetcher);

  return {
    user: data,
    isUserLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
}

export async function getUsers(value: string) {
  const data = await currentFetcher(path('getUsers', value))
  return {
    users: data,
  };
}
