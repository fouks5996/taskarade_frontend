import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher, fetcher } from "../config";

export function useTicketstatus() {
	const { data, error } = useSWR([path("ticket_status")], fetcher);

	return {
		ticketStatus: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useTicketPriority() {
	const { data, error } = useSWR([path("ticket_priority")], fetcher);

	return {
		ticketPriority: data,
		isLoading2: !error && !data,
		isError: error,
	};
}
