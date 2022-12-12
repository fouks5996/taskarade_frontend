import React, { ReactComponentElement, useState } from "react";
import { TicketsHeaderItem, TicketStatus } from "./TicketsItem";
import { MdFilterList } from "react-icons/md";
import { EditItem } from "../../modal/TicketModal";
import { useTicketstatus } from "../../../services/api/ticket";
import Loader from "../../Loader/Loader";
import { NotificationDot } from "../../notification/Notifications";

export function TicketsHeader({ setStatusFilter, statusFilter }) {
	const [filter, setFilter] = useState(false);

	return (
		<tr className='h-[50px] border-b border-stroke-blue'>
			<TicketsHeaderItem> Id </TicketsHeaderItem>
			<TicketsHeaderItem>
				<TicketItemFilter
					getter={filter}
					setter={setFilter}
					label={"Status"}
					statusFilter={statusFilter}
					component={
						<StatusFilter
							statusFilter={statusFilter}
							setStatusFilter={setStatusFilter}
						/>
					}
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
	statusFilter: any;
}

export function TicketItemFilter({
	getter,
	setter,
	label,
	component,
	statusFilter,
}: TicketItemFilterProps) {
	return (
		<div
			onClick={() => setter((getter: any) => !getter)}
			className='flex relative cursor-pointer   justify-center items-center gap-1 '>
			<span className='relative '>
				{" "}
				{label}{" "}
				{statusFilter !== null && statusFilter !== false && (
					<span className='absolute -right-7 top-2.5'>
						{" "}
						<NotificationDot />{" "}
					</span>
				)}{" "}
			</span>{" "}
			<MdFilterList />
			{getter && (
				<div className='bg-blue-600 border border-stroke-blue absolute top-6 z-50 right-18 rounded-md px-3 py-3'>
					{component}
				</div>
			)}
		</div>
	);
}

export function StatusFilter({ setStatusFilter, statusFilter }) {
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
					className='relative '
					key={status.id}>
					{" "}
					<TicketStatus fit status={status.attributes} />
					{statusFilter === status.id && (
						<span className='absolute top-0 -left-1'>
							<NotificationDot />
						</span>
					)}
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
