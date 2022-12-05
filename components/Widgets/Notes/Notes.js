import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import {
	useCurrentProjectWidget,
	useCurrentWidget,
} from "../../../services/api/widget";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import ListNotes from "./ListNotes";
import ContentNotes from "./ContentNotes";
import { create } from "domain";
import { post } from "../../../services/config";
import { path } from "../../../services/routes";
import { BsPlus } from "react-icons/bs";
import WidgetWrapper from "../WidgetWrapper";

export default function Notes({ maxId }) {
	const [active, setActive] = useState(maxId);
	const router = useRouter();
	const { pid, id } = router.query;
	const { project, isLoading, mutate } = useCurrentProject(id);

	if (isLoading)
		return (
			<Layout>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);
	if (project.error?.status === 404) {
		router.push("/404?error=not_found");
	}

	const widget = project.data?.attributes.project_widgets.data.find(
		(widget) => widget.id === parseInt(pid)
	);

	const activeNote = widget?.attributes.notes.data.find(
		(activeNote) => activeNote.id === active
	);

	async function createNote() {
		console.log("create");
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
		(a, b) =>
			new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
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
