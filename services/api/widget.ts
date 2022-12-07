import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";
import { Widget, Widgets } from "next/app";

export function useWidgets() {
	const { data, error } = useSWR<Widgets>([path("GET_widgets")], currentFetcher);

	return {
		widgets: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useCurrentWidget(id: number) {
	const { data, error, mutate } = useSWR<Widget>(
		[path("current_widget", id)],
		currentFetcher
	);

	return {
		widget: data,
		isWidgetLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}


