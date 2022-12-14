import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../../../components/Layout/Layout";
import Loader from "../../../../../components/Loader/Loader";
import Notes from "../../../../../components/Widgets/Notes/Notes";
import Tasks from "../../../../../components/Widgets/Tasks/Tasks";
import Tickets from "../../../../../components/Widgets/Tickets/Tickets";
import { useCurrentNotes } from "../../../../../services/api/note";
import { useCurrentWidget } from "../../../../../services/api/widget";


export default function Index() {
	const router = useRouter();
	const { pid } = router.query ;
	const { widget, isWidgetLoading } = useCurrentWidget(parseInt(pid));
	const { current_notes, isNotesLoading, mutateNotes } = useCurrentNotes(parseInt(pid));

	if (isWidgetLoading || isNotesLoading)
		return (
			<Layout title='Loading'>
				<div className='flex h-full  justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);

	if (widget.error?.status === 404) {
		router.push("/404?error=not_found");
	}
	 
	switch (widget.data?.attributes.widget.data.id) {
		case 1:
			return (
				<Layout title={"Notes"}>
					<Notes maxId={0} widgetData={current_notes} mutateNotes={mutateNotes} />
				</Layout>
			);
		case 2:
			return (
				<Layout title={"Tasks"}>
					<Tasks />
				</Layout>
			);
		case 3:
			return (
				<Layout title={"Tickets"}>
					<Tickets />
				</Layout>
			);
	}
}


Index.auth = true; 
