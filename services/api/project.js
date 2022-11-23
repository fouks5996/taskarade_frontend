import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";

export function useCurrentProject(jwt, id) {
	const { data, error, mutate } = useSWR(
		[path("current_project", id), jwt],
		currentFetcher
	);

	return {
		project: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
