import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function usePosts() {
	const { data, error, mutate } = useSWR(path("all_posts"), currentFetcher);

	return {
		posts: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
