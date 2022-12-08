import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import ListNotes from "./ListNotes";
import ContentNotes from "./ContentNotes";
import { post } from "../../../services/config";
import { path } from "../../../services/routes";
import { BsPlus } from "react-icons/bs";
import WidgetWrapper from "../WidgetWrapper";
import { queryTypes } from "next/app";

type queryType = string;

export default function Notes({ maxId, widgetData }) {
	const [active, setActive] = useState(maxId);
	const router = useRouter();
	const { id, pid } = router.query as queryTypes;
	const { project, isLoading, mutate } = useCurrentProject(parseInt(id));
	const [noteData, setNoteData] = useState(widgetData);

	if (isLoading)
		return (
			<Layout title='loading'>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);
	if (project.error?.status === 404) {
		router.push("/404?error=not_found");
	}

	const widget = project.data?.attributes.project_widgets.data.find(
		(widget: { id: number }) => widget.id === parseInt(pid)
	);

	console.log(widget);
	console.log(noteData);

	const activeNote = widget?.attributes.notes.data.find(
		(activeNote: { id: number }) => activeNote.id === active
	);

	async function createNote() {
		const body = {
			data: { title: "New note", project_widget: parseInt(pid) },
		};
		const { success } = await post(path("CREATE_note"), body);
		if (success) {
			mutate();
			console.log(success);
		}
	}

	widget?.attributes.notes.data.sort(
		(
			a: { attributes: { updatedAt: string | number | Date } },
			b: { attributes: { updatedAt: string | number | Date } }
		) =>
			new Date(b.attributes.updatedAt).getTime() -
			new Date(a.attributes.updatedAt).getTime()
	);

	return (
		<WidgetWrapper>
			<WidgetHeader
				name={widget?.attributes.name}
				widgetID={widget?.attributes.widget.data.id}
				type={"note"}
				onclick={() => createNote()}
				icon={<BsPlus />}
			/>
			<div className='flex gap-3 mt-6 h-full'>
				<ListNotes
					notes={widget?.attributes.notes}
					active={active}
					setActive={setActive}
					mutate={mutate}
				/>
				<ContentNotes activeNote={activeNote} mutate={mutate} />
			</div>
		</WidgetWrapper>
	);
}
