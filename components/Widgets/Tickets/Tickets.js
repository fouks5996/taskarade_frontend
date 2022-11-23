import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import WidgetWrapper from "../WidgetWrapper";
import { BsPlus } from "react-icons/bs";
import TicketsHeader from "./TicketsHeader";
import TicketsTable from "./TicketsTable";
import CreateTicket from "./CreateTicket";

export default function Tickets({ tickets }) {
	const router = useRouter();
	const { pid, id } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const [createTicket, setCreateTicket] = useState(false);
	const { project, isLoading, mutate } = useCurrentProject(jwt, id);
	if (isLoading)
		return (
			<Layout>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />{" "}
				</div>
			</Layout>
		);

	const widget = project.data?.attributes.project_widgets.data.find(
		(widget) => widget.id === parseInt(pid)
	);

	return (
		<WidgetWrapper>
			{createTicket ? (
				<CreateTicket
					setCreateTicket={setCreateTicket}
					project={project}
					mutate={mutate}
				/>
			) : (
				<>
					{" "}
					<WidgetHeader
						name={widget?.attributes.name}
						type={"ticket"}
						onclick={() => setCreateTicket(true)}
						icon={<BsPlus />}
					/>
					<table className='w-full mt-10 max-w-[1300px] min-w-[900px] overflow-x-scroll'>
						<TicketsHeader />
						{widget?.attributes.tickets.data.map((ticket, key) => {
							return <TicketsTable key={key} ticket={ticket} />;
						})}
					</table>
				</>
			)}
		</WidgetWrapper>
	);
}
