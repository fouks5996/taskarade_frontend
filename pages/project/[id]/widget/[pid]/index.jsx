import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../../../components/Layout/Layout";
import Loader from "../../../../../components/Loader/Loader";
import Notes from "../../../../../components/Widgets/Notes/Notes";
import Tasks from "../../../../../components/Widgets/Tasks/Tasks";
import Tickets from "../../../../../components/Widgets/Tickets/Tickets";
import { useCurrentWidget } from "../../../../../services/api/widget";
import { authOptions } from '../../../../api/auth/[...nextauth]'


export async function getServerSideProps(context) {

	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const currentUserID = session.id 

	const options= {
		method: 'GET',
		headers:{
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
		}
	}
	const widgetID = parseInt(context.params.pid);

	context.res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=60'
  )

	const dataP = await fetch(`${process.env.STRAPI_URL}/api/getssr-widget/${widgetID}`, options)
	const resP = await dataP.json()

 	if ((resP[0]?.widget_creator.id !== currentUserID && collaborationsIsTrue() === false) || (resP.length === 0 )) {
		return {
			redirect:{
				destination: '/404',
				permanent: false,
			},
		}
	 }

	function collaborationsIsTrue() {
		return resP[0]?.project.collaborations.some(
			(collaboration) =>
				collaboration.collaborator.id === currentUserID
		);
	} 

	return { 
		props: {
			widgetData: resP[0]
		},
	};
}


export default function Index({widgetData }) {
/*  	const router = useRouter();
	const { pid } = router.query ;
	const { widget, isWidgetLoading } = useCurrentWidget(parseInt(pid)); */

	console.log(widgetData);

/*  
	if (isWidgetLoading)
		return (
			<Layout title='Loading'>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);  */

	switch (widgetData.widget.id) {
		case 1:
/*  			if (widget.data?.attributes.notes.data.length !== 0) {
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
			} else {  */
				return (
					<Layout title={"Notes"}>
						<Notes maxId={0} />
					</Layout>
				);
 			/* }  */
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
