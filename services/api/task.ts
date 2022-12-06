import { CurrentTask, TagBg, TaskStatus } from "next/app";
import useSWR from "swr";
import { currentFetcher } from "../config";
import { path } from "../routes";

export function useTaskStatus() {
	const { data, error } = useSWR<TaskStatus>([path("task_status")], currentFetcher);

	return {
		taskStatus: data,
		taskLoading: !error && !data,
		isError: error,
	};
}

export function useCurrentTasks(projectWidgetID: number) {
	const { data, error, mutate } = useSWR<CurrentTask>(
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
	const { data, error, mutate } = useSWR<TagBg>([path("tag_bg")], currentFetcher);

	return {
		tag_bg: data,
		taskLoading1: !error && !data,
		isError: error,
		mutateTag: mutate,
	};
}
