import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { useAtom, useSetAtom } from "jotai";
import { alertAtom } from "../../../stores/alert";

type queryType = string;

export default function Notes({ maxId, widgetData, mutateNotes }) {
	const [active, setActive] = useState(maxId);
	const router = useRouter();
	const { id, pid } = router.query as queryTypes;
	const { project, isLoading, mutate } = useCurrentProject(parseInt(id));
	const [noteData, setNoteData] = useState(widgetData);
	const setAlert = useSetAtom(alertAtom);

	useEffect(() => {
		setNoteData(widgetData);
	}, [widgetData]);

	noteData.sort((a, b) => b.updatedAt - a.updatedAt);

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

	const activeNote = noteData.find(
		(activeNote: { id: number }) => activeNote.id === active
	);

	const onUpdateNote = (updatedNote) => {
		const updatedNotesArray = noteData.map((note) => {
			if (note.id === activeNote.id) {
				return updatedNote;
			}
			return note;
		});
		setNoteData(updatedNotesArray);
	};

	async function createNote() {
		const body = {
			data: { title: "New note", project_widget: parseInt(pid) },
		};
		const { success } = await post(path("CREATE_note"), body);

		if (success) {
			setAlert({
				content: "Note succesfully created 🎉",
				active: true,
				success: true,
			});
			const newNote = {
				title: "New note",
				updatedAt: Date.now(),
				id: success.data.id,
			};
			setNoteData([newNote, ...noteData]);
			mutate();
			mutateNotes();
		} else {
			setAlert({
				content: "Error occured, please try again",
				active: true,
			});
		}
	}

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
					notes={noteData}
					setNoteData={setNoteData}
					active={active}
					setActive={setActive}
					mutate={mutate}
					mutateNotes={mutateNotes}
				/>
				<ContentNotes
					activeNote={activeNote}
					mutate={mutate}
					onUpdateNote={onUpdateNote}
				/>
			</div>
		</WidgetWrapper>
	);
}
