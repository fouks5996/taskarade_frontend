import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";

export function useCurrentProject(id) {
	const { data, error, mutate } = useSWR(
		[path("current_project", id)],
		currentFetcher
	);

	return {
		project: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}

export function useProjectCollab(id) {
	const { data, error, mutate } = useSWR(
		[path("current_project_collab", id)],
		currentFetcher
	);

	return {
		project_collab: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
