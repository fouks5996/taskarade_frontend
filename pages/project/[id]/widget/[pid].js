import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../../components/Layout/Layout";
import Loader from "../../../../components/Loader/Loader";
import Notes from "../../../../components/Widgets/Notes/Notes";
import Tasks from "../../../../components/Widgets/Tasks/Tasks";
import Tickets from "../../../../components/Widgets/Tickets/Tickets";
import { useCurrentWidget } from "../../../../services/api/widget";

export default function Index() {
	const router = useRouter();
	const { pid } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const { widget, isLoading } = useCurrentWidget(jwt, parseInt(pid));
	if (isLoading)
		return (
			<Layout>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);

	switch (widget.data?.attributes.widget.data.id) {
		case 1:
			if (widget.data?.attributes.notes.data.length !== 0) {
				const today = new Date();
				const closest = widget.data?.attributes.notes.data.reduce((a, b) =>
					new Date(a.attributes.updatedAt) - today >
					new Date(b.attributes.updatedAt) - today
						? a
						: b
				);

				return (
					<Layout>
						<Notes maxId={closest.id} />
					</Layout>
				);
			} else {
				return (
					<Layout>
						<Notes maxId={0} />
					</Layout>
				);
			}
		case 2:
			return (
				<Layout>
					<Tasks />
				</Layout>
			);
		case 3:
			return (
				<Layout>
					<Tickets />
				</Layout>
			);
	}
}
