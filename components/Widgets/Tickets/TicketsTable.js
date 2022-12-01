import React from "react";
import {
	TicketPercentage,
	TicketPriority,
	TicketsTableItem,
	TicketStatus,
} from "./TicketsItem";

export default function TicketsTable({ ticket, setModal }) {
	return (
		<tr
			onClick={() => setModal({ state: true, data: ticket })}
			className='hover:bg-blue-600 cursor-pointer rounded-md '>
			<TicketsTableItem>{ticket.attributes.identifier} </TicketsTableItem>
			<TicketsTableItem>
				<TicketStatus
					status={ticket.attributes.ticket_status.data.attributes}
				/>{" "}
			</TicketsTableItem>
			<TicketsTableItem>
				<TicketPriority
					priority={ticket.attributes.ticket_priority.data.attributes}
				/>
			</TicketsTableItem>
			<TicketsTableItem>{ticket.attributes.subject} </TicketsTableItem>
			<TicketsTableItem>
				{" "}
				{!ticket.attributes.assigned.data
					? "-"
					: ticket.attributes.assigned.data.attributes.username}{" "}
			</TicketsTableItem>
			<TicketsTableItem time>
				{" "}
				{ticket.attributes.estimated_time}{" "}
			</TicketsTableItem>
			<TicketsTableItem time>
				{" "}
				{ticket.attributes.realized_time}{" "}
			</TicketsTableItem>
			<TicketsTableItem>
				{" "}
				<TicketPercentage
					estimated={ticket.attributes.estimated_time}
					realized={ticket.attributes.realized_time}
				/>{" "}
			</TicketsTableItem>
		</tr>
	);
}
