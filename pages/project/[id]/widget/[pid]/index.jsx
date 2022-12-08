import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "../../../../../components/Layout/Layout";
import Loader from "../../../../../components/Loader/Loader";
import Notes from "../../../../../components/Widgets/Notes/Notes";
import Tasks from "../../../../../components/Widgets/Tasks/Tasks";
import Tickets from "../../../../../components/Widgets/Tickets/Tickets";
import { GetProjectFromApi } from "../../../../../services/api/project";
import { useCurrentWidget } from "../../../../../services/api/widget";
import { authOptions } from '../../../../api/auth/[...nextauth]'


export async function getServerSideProps(context) {
	const options= {
		method: 'GET',
		headers:{
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
		}
	}
	const resP = await GetProjectFromApi(context.params.pid, options)

	if (context.query.q){
		const session = await unstable_getServerSession(
			context.req,
			context.res,
			authOptions
		);
		const currentUserID = session.id 
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
	}

	return { 
		props: {
			widgetData: resP[0]
		},
	};
}


export default function Index({widgetData}) {
	const router = useRouter();
	const { pid } = router.query ;
	const { widget, isWidgetLoading } = useCurrentWidget(parseInt(pid));

	if (isWidgetLoading)
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
					<Notes maxId={0} widgetData={widgetData.notes} />
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
