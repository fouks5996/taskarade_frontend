import  useSWR  from 'swr';
import { currentFetcher } from '../config';
import { path } from '../routes';


export function useCurrentNotes(projectWidgetID: number) {
	const { data, error, mutate } = useSWR(
		[path("current_notes", projectWidgetID)],
		currentFetcher
	);

	return {
		current_notes: data,
		isNotesLoading: !error && !data,
		isError: error,
		mutateNotes: mutate,
	};
}