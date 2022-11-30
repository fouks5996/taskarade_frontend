import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";
import { path } from "../routes";

export function useTaskStatus(jwt) {
	const { data, error } = useSWR([path("task_status"), jwt], currentFetcher);

	return {
		taskStatus: data,
		taskLoading: !error && !data,
		isError: error,
	};
}
