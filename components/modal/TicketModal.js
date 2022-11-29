import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";
import ModalLayout from "./ModalLayout";
import { remove, update } from "../../services/config";
import { path } from "../../services/routes";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import Button from "../actions/Button";
import { AiOutlineSave } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit2 } from "react-icons/fi";
import {
	AttributesLabel,
	AttributesWrapper,
	timeFormat,
} from "../Widgets/Tickets/CreateTicket";
import { useForm } from "react-hook-form";
import { TicketPriority, TicketStatus } from "../Widgets/Tickets/TicketsItem";
import { useTicketPriority, useTicketstatus } from "../../services/api/ticket";
import Loader from "../Loader/Loader";
import { useProjectCollab } from "../../services/api/project";
import Input from "../Forms/Input";
import { errorMessageValues, verifyTimeValue } from "../Forms/Errors";
import Tab from "../Tab/Tab";
import TicketComment from "../Widgets/Tickets/TicketComment";

export default function TicketModal({ ticket, setModal, mutate }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const [activeTab, setActiveTab] = useState("Comments");
	const [timeError, setTimeError] = useState(false);
	const [editPanel, SetEditPanel] = useState(false);
	const [editPanelPrio, SetEditPanelPrio] = useState(false);
	const [editPanelAssigned, SetEditPanelAssigned] = useState(false);
	const [startDate, setStartDate] = useState(
		new Date(ticket.attributes.Start_date)
	);
	const [endDate, setEndDate] = useState(new Date(ticket.attributes.end_date));
	const [reviewDate, setReviewDate] = useState(
		new Date(ticket.attributes.review_date)
	);
	const [status, setStatus] = useState({
		attributes: ticket.attributes.ticket_status.data.attributes,
		id: ticket.attributes.ticket_status.data.id,
	});
	const [priority, setPriority] = useState({
		attributes: ticket.attributes.ticket_priority.data.attributes,
		id: ticket.attributes.ticket_priority.data.id,
	});
	const [assigned, setAssigned] = useState({
		username: ticket.attributes.assigned.data.attributes.username,
		id: ticket.attributes.assigned.data.id,
	});

	const [estimated, setEstimated] = useState(ticket.attributes.estimated_time);
	const [realized, setRealized] = useState(ticket.attributes.realized_time);
	const router = useRouter();
	const { id, pid } = router.query;
	const { data: session } = useSession();
	const jwt = session?.jwt;
	const { ticketStatus, isLoading } = useTicketstatus();
	const { ticketPriority, isLoading2 } = useTicketPriority();
	const { project_collab, isLoading3 } = useProjectCollab(id, jwt);
	if (isLoading && isLoading2 && isLoading3)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />{" "}
			</div>
		);
	function deleteTicket() {
		remove(path("DELETE_ticket", ticket.id), mutate, jwt);
		setModal({ state: false, data: null });
	}

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<div
			className='bg-transparent cursor-pointer hover:bg-blue-700 font-regular flex items-center justify-center text-grey-text-active  text-13'
			onClick={onClick}
			ref={ref}>
			{value}
		</div>
	));
	CustomInput.displayName = "CustomInput";

	async function onSubmit(data) {
		const { error } = verifyTimeValue(
			data.estimated_time_value,
			deleteTime(estimated),
			data.realized_time_value,
			deleteTime(realized)
		);

		if (error) return setTimeError(true);

		setTimeError(false);
		const body = {
			data: {
				description: data.description,
				estimated_time: `${data.estimated_time_value}${deleteTime(estimated)}`,
				realized_time: `${data.realized_time_value}${deleteTime(realized)}`,
				ticket_priority: priority.id,
				ticket_status: status.id,
				assigned: assigned.id,
				Start_date: startDate,
				end_date: endDate,
				review_date: reviewDate,
				project_widget: parseInt(pid),
				identifier: ticket.attributes.identifier,
				ticket_owner: session.id,
			},
		};

		const { success } = await update(
			path("UPDATE_ticket", ticket.id),
			body,
			jwt
		);

		if (success) {
			mutate();
			setModal({ state: false, data: null });
		} else {
			console.log("erreur");
		}
	}

	return (
		<ModalLayout setModal={setModal}>
			<div className='p-7 pr-28'>
				<div className='flex items-center justify-between'>
					<div>
						<Heading size={"20"}>
							#{ticket.attributes.identifier} - {ticket.attributes.subject}
						</Heading>
						<Text regular color={"inactive"} size='14'>
							Created at
							{new Date(ticket.attributes.createdAt).toLocaleDateString(
								"fr-FR",
								{
									hour: "2-digit",
									minute: "2-digit",
								}
							)}{" "}
							by{" "}
							<span className='text-14 font-regular text-grey-text-active'>
								{" "}
								{ticket.attributes.ticket_owner.data.attributes.username}{" "}
							</span>
						</Text>
					</div>
					<div className='flex  justify-between gap-2'>
						<Button submit form={"myform"} principal icon color={"blue"}>
							<span className='text-grey-text-active text-20'>
								<AiOutlineSave />
							</span>
						</Button>
						<Button onclick={() => deleteTicket()} principal icon color={"red"}>
							<span className='text-grey-text-inactive text-20'>
								<FiTrash2 />
							</span>
						</Button>
					</div>
				</div>
				<form id='myform' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex justify-between items-start flex-wrap gap-3 mt-10 pb-8 border-b border-stroke-blue'>
						<div className='flex flex-col justify-start gap-3'>
							<AttributesWrapper>
								<AttributesLabel label={"Status :"} />
								<EditWrapperButton
									getter={editPanel}
									setter={SetEditPanel}
									item={<TicketStatus status={status.attributes} fit />}
								/>
								{editPanel && (
									<EditDropdown>
										{ticketStatus.data.map((status) => (
											<EditItem
												key={status.id}
												setterState={setStatus}
												setterPanel={SetEditPanel}
												data={status}
												item={
													<TicketStatus status={status.attributes} />
												}></EditItem>
										))}
									</EditDropdown>
								)}
							</AttributesWrapper>
							<AttributesWrapper>
								<AttributesLabel label={"Priority :"} />

								<EditWrapperButton
									getter={editPanelPrio}
									setter={SetEditPanelPrio}
									item={
										<TicketPriority priority={priority.attributes} fit big />
									}
								/>
								{editPanelPrio && (
									<EditDropdown>
										{ticketPriority.data.map((priority) => (
											<EditItem
												key={priority.id}
												setterState={setPriority}
												setterPanel={SetEditPanelPrio}
												data={priority}
												item={
													<TicketPriority big priority={priority.attributes} />
												}></EditItem>
										))}
									</EditDropdown>
								)}
							</AttributesWrapper>
							<AttributesWrapper>
								<AttributesLabel label={"Assigned :"} />
								<EditWrapperButton
									getter={editPanelAssigned}
									setter={SetEditPanelAssigned}
									item={<Text size={"13"}> {assigned.username}</Text>}
								/>
								{editPanelAssigned && (
									<EditDropdown>
										{project_collab.data.attributes.collaborations.data.map(
											(user) => (
												<span
													onClick={() => {
														setAssigned({
															username:
																user.attributes.collaborator.data.attributes
																	.username,
															id: user.attributes.collaborator.data.id,
														});
														SetEditPanelAssigned(false);
													}}
													className='cursor-pointer text-14 font-regular'
													key={user.attributes.collaborator.data.id}>
													{
														user.attributes.collaborator.data.attributes
															.username
													}
												</span>
											)
										)}
									</EditDropdown>
								)}
							</AttributesWrapper>
						</div>
						<div className='flex flex-col justify-start gap-3'>
							<AttributesWrapper>
								<AttributesLabel label={"Start date :"} />
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									dateFormat='d MMMM yyyy'
									locale='fr'
									minDate={new Date()}
									placeholderText='Choisir la date'
									customInput={<CustomInput />}
								/>
							</AttributesWrapper>
							<AttributesWrapper>
								<AttributesLabel label={"End date :"} />
								<DatePicker
									selected={endDate}
									onChange={(date) => setEndDate(date)}
									dateFormat='d MMMM yyyy'
									locale='fr'
									minDate={new Date()}
									placeholderText='Choisir la date'
									customInput={<CustomInput />}
								/>
							</AttributesWrapper>
							<AttributesWrapper>
								<AttributesLabel label={"Review date :"} />
								<DatePicker
									selected={reviewDate}
									onChange={(date) => setReviewDate(date)}
									dateFormat='d MMMM yyyy'
									locale='fr'
									minDate={new Date()}
									placeholderText='Choisir la date'
									customInput={<CustomInput />}
								/>
							</AttributesWrapper>
						</div>
						<div className='flex flex-col gap-6 justify-start'>
							<AttributesWrapper>
								<AttributesLabel label={"Estimated time :"} />
								<div className='flex items-center relative max-w-[100px] max-h-[30px]'>
									<Input
										placeholder='Ex: 34'
										type={"text"}
										name={"estimated_time_value"}
										defaultValue={deleteFormat(estimated)}
										register={register}
										errors={errors}
										validationsSchema={errorMessageValues.estimated_time}
									/>
									<select
										value={deleteTime(estimated)}
										onChange={(e) => setEstimated(e.target.value)}
										className={`${"absolute  z-50 top-2 right-2 text-14 "} bg-transparent rounded-md text-grey-text-active  cursor-pointer font-regular hover:bg-blue-700  focus:outline-none`}>
										{timeFormat?.data.map((r) => {
											return (
												<option key={r.id} value={r.id}>
													{r.attributes.label}
												</option>
											);
										})}
									</select>
								</div>
							</AttributesWrapper>
							<AttributesWrapper>
								<AttributesLabel label={"Realized time :"} />
								<div className='flex items-center relative max-w-[100px] max-h-[30px]'>
									<Input
										placeholder='Ex: 34'
										type={"text"}
										name={"realized_time_value"}
										defaultValue={deleteFormat(realized)}
										register={register}
										errors={errors}
										validationsSchema={errorMessageValues.estimated_time}
									/>
									<select
										value={deleteTime(realized)}
										onChange={(e) => setRealized(e.target.value)}
										className={`${"absolute  z-50 top-2 right-2 text-14 "} bg-transparent rounded-md text-grey-text-active  cursor-pointer font-regular hover:bg-blue-700  focus:outline-none`}>
										{timeFormat?.data.map((r) => {
											return (
												<option key={r.id} value={r.id}>
													{r.attributes.label}
												</option>
											);
										})}
									</select>
								</div>
							</AttributesWrapper>
							{timeError && (
								<span className='text-red text-13 text-end mt-2 max-w-[200px] font-regular'>
									{errorMessageValues.timeError}
								</span>
							)}
						</div>
					</div>
					<div className='mt-8'>
						<Input
							defaultValue={ticket.attributes.description}
							placeholder='Describe your ticket ...'
							textarea
							name={"description"}
							register={register}
							errors={errors}
							validationsSchema={errorMessageValues.description}
						/>
					</div>
				</form>
				<div className='mt-8'>
					<Tab
						active={activeTab}
						setActive={setActiveTab}
						tabs={["Comments", "History"]}
					/>
					{activeTab === "Comments" && (
						<TicketComment
							ticketID={ticket.id}
							ticketOwner={ticket.attributes.ticket_owner.data.id}
							ticketName={ticket.attributes.subject}
						/>
					)}
				</div>
			</div>
		</ModalLayout>
	);
}

export function deleteFormat(time) {
	if (time.includes("d")) {
		return time.replace("d", "");
	}
	if (time.includes("h")) {
		return time.replace("h", "");
	}
	if (time.includes("min")) {
		return time.replace("min", "");
	}
}

export function deleteTime(time) {
	if (time.includes("d")) {
		return time.replace(time, "d");
	}
	if (time.includes("h")) {
		return time.replace(time, "h");
	}
	if (time.includes("min")) {
		return time.replace(time, "min");
	}
}

export function EditButton({ getter, setter }) {
	return (
		<p
			className='text-14 cursor-pointer text-grey-text-active'
			onClick={() => setter((getter) => !getter)}>
			{" "}
			<FiEdit2 />{" "}
		</p>
	);
}

export function EditWrapperButton({ getter, setter, item = false }) {
	return (
		<div className='flex items-center gap-3 justify-start  min-w-[130px]'>
			{item && item}
			<EditButton getter={getter} setter={setter} />
		</div>
	);
}

export function EditDropdown({ children }) {
	return (
		<div className='absolute bg-blue-500 flex flex-col gap-5 items-start py-4 px-5 z-50 rounded-md top-6 right-8'>
			{children}
		</div>
	);
}

export function EditItem({ item, setterState, setterPanel, data }) {
	return (
		<span
			onClick={() => {
				setterState({ attributes: data.attributes, id: data.id });
				setterPanel(false);
			}}
			className='cursor-pointer '>
			{item}
		</span>
	);
}
