import { path } from "../routes";
import useSWR from "swr";
import { currentFetcher } from "../config";
import type { TicketComments, TicketPriority, TicketStatus } from "next/app";

export function useTicketstatus() {
	const { data, error } = useSWR<TicketStatus>([path("ticket_status")], currentFetcher);

	return {
		ticketStatus: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export function useTicketPriority() {
	const { data, error } = useSWR<TicketPriority>([path("ticket_priority")], currentFetcher);

	return {
		ticketPriority: data,
		isLoading2: !error && !data,
		isError: error,
	};
}

export function useTicketComments(id: number) {
	const { data, error, mutate } = useSWR<TicketComments>(
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
