import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";
import { path } from "../routes";

export function useTaskStatus() {
	const { data, error } = useSWR([path("task_status")], currentFetcher);

	return {
		taskStatus: data,
		taskLoading: !error && !data,
		isError: error,
	};
}

export function useCurrentTasks(projectWidgetID) {
	const { data, error, mutate } = useSWR(
		[path("current_tasks", projectWidgetID)],
		currentFetcher
	);

	return {
		current_tasks: data,
		taskLoading1: !error && !data,
		isError: error,
		mutateTask: mutate,
	};
}

export function useTagBg() {
	const { data, error, mutate } = useSWR([path("tag_bg")], currentFetcher);

	return {
		tag_bg: data,
		taskLoading1: !error && !data,
		isError: error,
		mutateTag: mutate,
	};
}
