import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function useTicketstatus() {
	const { data, error } = useSWR([path("ticket_status")], currentFetcher);

	return {
		ticketStatus: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useTicketPriority() {
	const { data, error } = useSWR([path("ticket_priority")], currentFetcher);

	return {
		ticketPriority: data,
		isLoading2: !error && !data,
		isError: error,
	};
}

export function useTicketComments(id) {
	const { data, error, mutate } = useSWR(
		[path("ticket_comments", id)],
		currentFetcher
	);

	return {
		comments: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
