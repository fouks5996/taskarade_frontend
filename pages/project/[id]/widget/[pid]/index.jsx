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
	const resP = await GetProjectFromApi(widgetID, options)

	if (context.query.q){
		console.log("je fais la fonction !");
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
			widgetData: resP[0],
		},
	};
}


export default function Index({widgetData}) {

/* 	const widgetData = {
		widget:{
			id: randomIntFromInterval(1, 3)
		}
	}

	function randomIntFromInterval(min, max) { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	 } */
	 
	switch (widgetData.widget.id) {
		case 1:
				return (
						<Layout title={"Notes"}>
							<Notes maxId={0} />
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
