import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function useWidgets() {
	const { data, error } = useSWR([path("GET_widgets")], currentFetcher);

	return {
		widgets: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useCurrentWidget(id) {
	const { data, error, mutate } = useSWR(
		[path("current_widget", id)],
		currentFetcher
	);

	return {
		widget: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
