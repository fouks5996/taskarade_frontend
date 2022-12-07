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
import { queryTypes, Ticket } from "next/app";

export default function Tickets() {
	const router = useRouter();
	const { id, pid } = router.query as queryTypes;
	const [createTicket, setCreateTicket] = useState(false);
	const [statusFilter, setStatusFilter] = useState(null);
	const [modal, setModal] = useState<{ state: boolean; data: {} }>({
		state: false,
		data: null,
	});
	const { project, isLoading, mutate } = useCurrentProject(parseInt(id));

	if (isLoading)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />
			</div>
		);

	if (project.error?.status === 404) {
		router.push("/404?error=not_found");
	}

	const widget = project.data?.attributes.project_widgets.data.find(
		(widget: { id: number }) => widget.id === parseInt(pid)
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
									.filter((ticket: Ticket) =>
										statusFilter
											? ticket.attributes.ticket_status.data.id === statusFilter
											: ticket
									)
									.map((ticket: Ticket, key: React.Key) => {
										return (
											<TicketsTable
												key={key}
												ticket={ticket}
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
