import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function useWidgets(jwt) {
	const { data, error } = useSWR([path("GET_widgets"), jwt], currentFetcher);

	return {
		widgets: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useCurrentWidget(jwt, id) {
	const { data, error, mutate } = useSWR(
		[path("current_widget", id), jwt],
		currentFetcher
	);

	return {
		widget: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}

export function useCurrentProjectWidget(jwt, id) {
	const { data, error, mutate } = useSWR(
		[path("current_project_widget", id), jwt],
		currentFetcher
	);

	return {
		widget: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
