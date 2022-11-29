import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";
import { path } from "../routes";

export function useTaskStatus(jwt) {
	const { data, error } = useSWR([path("task_status"), jwt], currentFetcher);

	return {
		taskStatus: data,
		isLoading: !error && !data,
		isError: error,
	};
}
