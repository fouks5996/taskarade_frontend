import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { queryTypes, SessionProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../../../components/Layout/Layout";
import Loader from "../../../../../components/Loader/Loader";
import Notes from "../../../../../components/Widgets/Notes/Notes";
import Tasks from "../../../../../components/Widgets/Tasks/Tasks";
import Tickets from "../../../../../components/Widgets/Tickets/Tickets";
import { useCurrentProject } from "../../../../../services/api/project";
import { useCurrentWidget } from "../../../../../services/api/widget";
import { authOptions } from '../../../../api/auth/[...nextauth]'


export async function getStaticProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const currentUserID = session.id
	const widgetID = parseInt(context.params.pid);
	const projectID = parseInt(context.params.id);

	context.res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=60'
  )

	const options= {
		method: 'GET',
		headers:{
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
		}
	}

	const dataP = await fetch(`${process.env.STRAPI_URL}/api/getssr-project/${projectID}`, options)
	const resP = await dataP.json()
	const dataW = await fetch(`${process.env.STRAPI_URL}/api/getssr-widget/${widgetID}`, options)
	const resW = await dataW.json()


	if ((resW[0]?.widget_creator.id !== currentUserID && collaborationsIsTrue() === false) || (resW.length === 0 || resP.length === 0)) {
		return {
			notFound: true,
		}
	 }

	function collaborationsIsTrue() {
		return resP[0].collaborations.some(
			(collaboration) =>
				collaboration.collaborator.id === currentUserID
		);
	}

	return { 
		props: {
			widgetData: resW,
			projectData: resP
		},
		revalidate: 5, 
	};
}

export default function Index({ widgetData, projectData }) {
/* 	const router = useRouter();
	const { pid } = router.query ;
	const { widget, isWidgetLoading } = useCurrentWidget(parseInt(pid));
 */

/* 
	if (isWidgetLoading)
		return (
			<Layout title='Loading'>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		); */

		console.log(widgetData);

	switch (widgetData[0].widget.id) {
		case 1:
/* 			if (widgetData[0].notes.length !== 0) {
				const today = new Date();
				const closest =
					widget.data?.attributes.notes.data.reduce((a, b) =>
						new Date(a.attributes.updatedAt).getTime() - today.getTime() >
						new Date(b.attributes.updatedAt).getTime() - today.getTime()
							? a
							: b
					);

				return (
					<Layout title={"Notes"}>
						<Notes maxId={closest.id} />
					</Layout>
				);
			} else { */
				return (
					<Layout title={"Notes"}>
						<Notes maxId={0} />
					</Layout>
				);
/* 			} */
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
