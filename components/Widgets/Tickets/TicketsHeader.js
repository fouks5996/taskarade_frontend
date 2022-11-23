import React from "react";
import { TicketsHeaderItem } from "./TicketsItem";

export default function TicketsHeader() {
	return (
		<tr className='h-[50px] border-b border-stroke-blue'>
			<TicketsHeaderItem> Id </TicketsHeaderItem>
			<TicketsHeaderItem> Status </TicketsHeaderItem>
			<TicketsHeaderItem> Priority </TicketsHeaderItem>
			<TicketsHeaderItem> Subject </TicketsHeaderItem>
			<TicketsHeaderItem> Assigned to </TicketsHeaderItem>
			<TicketsHeaderItem> Estimated time </TicketsHeaderItem>
			<TicketsHeaderItem> Realized time </TicketsHeaderItem>
			<TicketsHeaderItem> % done </TicketsHeaderItem>
		</tr>
	);
}
