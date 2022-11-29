import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import WidgetWrapper from "../WidgetWrapper";
import { BsPlus } from "react-icons/bs";
import { TicketsHeader } from "./TicketsHeader";
import TicketsTable from "./TicketsTable";
import CreateTicket from "./CreateTicket";
import TicketModal from "../../modal/TicketModal";

export default function Tickets() {
	const router = useRouter();
	const { pid, id } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const [createTicket, setCreateTicket] = useState(false);
	const [statusFilter, setStatusFilter] = useState(false);
	const [modal, setModal] = useState({ state: false, data: null });
	const { project, isLoading, mutate } = useCurrentProject(jwt, id);
	if (isLoading)
		return (
			<Layout>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />
				</div>
			</Layout>
		);

	const widget = project.data?.attributes.project_widgets.data.find(
		(widget) => widget.id === parseInt(pid)
	);

	return (
		<>
			<WidgetWrapper>
				{createTicket ? (
					<CreateTicket
						setCreateTicket={setCreateTicket}
						project={project}
						mutate={mutate}
					/>
				) : (
					<>
						<WidgetHeader
							name={widget?.attributes.name}
							widgetID={widget?.attributes.widget.data.id}
							type={"ticket"}
							onclick={() => setCreateTicket(true)}
							icon={<BsPlus />}
						/>
						<table className='w-full mt-5 min-w-[900px] overflow-x-scroll'>
							<tbody>
								<TicketsHeader setStatusFilter={setStatusFilter} />

								{widget?.attributes.tickets.data
									.filter((ticket) =>
										statusFilter
											? ticket.attributes.ticket_status.data.id === statusFilter
											: ticket
									)
									.map((ticket, key) => {
										return (
											<TicketsTable
												key={key}
												ticket={ticket}
												mutate={mutate}
												setModal={setModal}
											/>
										);
									})}
							</tbody>
						</table>
						{modal.state && (
							<TicketModal
								ticket={modal.data}
								setModal={setModal}
								mutate={mutate}
							/>
						)}
					</>
				)}
			</WidgetWrapper>
		</>
	);
}
