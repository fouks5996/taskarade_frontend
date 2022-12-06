import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";
import { CurrentProject, CurrentProjectCollab } from "next/app";

export function useCurrentProject(id:number) {
	const { data, error, mutate } = useSWR<CurrentProject>(
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

export function useProjectCollab(id: number) {
	const { data, error, mutate } = useSWR<CurrentProjectCollab>(
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
