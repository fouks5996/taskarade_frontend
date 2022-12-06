import React, { ReactComponentElement, useState } from "react";
import { TicketsHeaderItem, TicketStatus } from "./TicketsItem";
import { MdFilterList } from "react-icons/md";
import { EditItem } from "../../modal/TicketModal";
import { useTicketstatus } from "../../../services/api/ticket";
import Loader from "../../Loader/Loader";

export function TicketsHeader({ setStatusFilter }) {
	const [filter, setFilter] = useState(false);

	return (
		<tr className='h-[50px] border-b border-stroke-blue'>
			<TicketsHeaderItem> Id </TicketsHeaderItem>
			<TicketsHeaderItem>
				<TicketItemFilter
					getter={filter}
					setter={setFilter}
					label={"Status"}
					component={<StatusFilter setStatusFilter={setStatusFilter} />}
				/>
			</TicketsHeaderItem>
			<TicketsHeaderItem> Priority </TicketsHeaderItem>
			<TicketsHeaderItem> Subject </TicketsHeaderItem>
			<TicketsHeaderItem> Assigned to </TicketsHeaderItem>
			<TicketsHeaderItem> Estimated time </TicketsHeaderItem>
			<TicketsHeaderItem> Realized time </TicketsHeaderItem>
			<TicketsHeaderItem> % done </TicketsHeaderItem>
		</tr>
	);
}

interface TicketItemFilterProps {
	getter: boolean;
	setter: Function;
	label: string;
	component: any;
}

export function TicketItemFilter({
	getter,
	setter,
	label,
	component,
}: TicketItemFilterProps) {
	return (
		<div
			onClick={() => setter((getter: any) => !getter)}
			className='flex relative cursor-pointer  justify-center items-center gap-1 '>
			<span> {label} </span> <MdFilterList />
			{getter && (
				<div className='bg-blue-600 border border-stroke-blue absolute top-6 z-50 right-18 rounded-md px-3 py-4'>
					{component}
				</div>
			)}
		</div>
	);
}

export function StatusFilter({ setStatusFilter }) {
	const { ticketStatus, isLoading } = useTicketstatus();
	if (isLoading)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />{" "}
			</div>
		);

	return (
		<div className='flex flex-col gap-3'>
			{ticketStatus.data.map((status) => (
				<span
					onClick={() => setStatusFilter(status.id)}
					className=''
					key={status.id}>
					{" "}
					<TicketStatus fit status={status.attributes} />{" "}
				</span>
			))}
			<p
				onClick={() => setStatusFilter(false)}
				className='text-13 text-grey-text-active font-regular cursor-pointer hover:underline'>
				{" "}
				Remove Filter{" "}
			</p>
		</div>
	);
}
