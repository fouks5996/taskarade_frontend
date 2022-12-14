import React, { forwardRef, useState } from "react";
import Heading from "../../Typography/Heading";
import { BsArrowLeft } from "react-icons/bs";
import Input from "../../Forms/Input";
import { useForm } from "react-hook-form";
import { errorMessageValues } from "../../Forms/Errors";
import { useSession } from "next-auth/react";
import Loader from "../../Loader/Loader";
import {
	useTicketPriority,
	useTicketstatus,
} from "../../../services/api/ticket";
import Button from "../../actions/Button";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { post } from "../../../services/config";
import { path } from "../../../services/routes";
import { useSetAtom } from "jotai";
import { alertAtom } from "../../../stores/alert";

export default function CreateTicket({ setCreateTicket, project, mutate }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [reviewDate, setReviewDate] = useState(new Date());
	const { ticketStatus, isLoading } = useTicketstatus();
	const { ticketPriority, isLoading2 } = useTicketPriority();
	const setAlert = useSetAtom(alertAtom);

	const router = useRouter();
	const { pid } = router.query;
	const { data: session } = useSession();
	if (isLoading && isLoading2)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />{" "}
			</div>
		);

	const onSubmit = async (data) => {
		const body = {};

		if (data.assigned !== "") {
			body = {
				data: {
					subject: data.subject,
					description: data.description,
					estimated_time: `${data.estimated_time_value}${data.estimated_time_format}`,
					realized_time: "0min",
					ticket_priority: data.ticket_priority
						? parseInt(data.ticket_priority)
						: 1,
					ticket_status: data.ticket_status ? parseInt(data.ticket_status) : 1,
					assigned: data.assigned && parseInt(data.assigned),
					Start_date: startDate,
					end_date: endDate,
					review_date: reviewDate,
					project_widget: parseInt(pid),
					identifier: Math.floor(Math.random() * 100),
					ticket_owner: session.id,
				},
			};
		} else {
			body = {
				data: {
					subject: data.subject,
					description: data.description,
					estimated_time: `${data.estimated_time_value}${data.estimated_time_format}`,
					realized_time: "0min",
					ticket_priority: data.ticket_priority
						? parseInt(data.ticket_priority)
						: 1,
					ticket_status: data.ticket_status ? parseInt(data.ticket_status) : 1,
					Start_date: startDate,
					end_date: endDate,
					review_date: reviewDate,
					project_widget: parseInt(pid),
					identifier: Math.floor(Math.random() * 100),
					ticket_owner: session.id,
				},
			};
		}

		/* 		let formData = new FormData();
		formData.append("files.file", data.file[0]);
		formData.append("data", body);

		console.log(formData); */

		const { success, error } = await post(path("CREATE_ticket"), body);

		if (success) {
			setAlert({
				content: "Ticket succesfully created",
				active: true,
				success: true,
			});
			mutate();
			setCreateTicket(false);
		} else {
			setAlert({
				content: "Error occured, please try again",
				active: true,
			});
			alert(JSON.stringify(error));
		}
	};

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<div
			className='bg-transparent cursor-pointer hover:bg-blue-700 font-regular flex items-center justify-center text-grey-text-active border border-stroke-blue rounded-md py-2 px-3  text-14'
			onClick={onClick}
			ref={ref}>
			{value}
		</div>
	));
	CustomInput.displayName = "CustomInput";

	return (
		<div className='max-w-[1200px]'>
			<div className='flex text-20 items-center gap-3'>
				<span className='cursor-pointer' onClick={() => setCreateTicket(false)}>
					{" "}
					<BsArrowLeft />{" "}
				</span>
				<Heading size={"28"}> Create a ticket </Heading>{" "}
			</div>
			<form
				id='create'
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 px-8 mt-8'>
				<Input
					placeholder='Enter a subject'
					type={"text"}
					name={"subject"}
					register={register}
					errors={errors}
					validationsSchema={errorMessageValues.subject}
				/>
				<div className='flex justify-between flex-wrap gap-3'>
					<div className='flex flex-col justify-start gap-3'>
						<AttributesWrapper>
							<AttributesLabel label={"Status :"} />
							<SelectItem
								register={register}
								label='ticket_status'
								datas={ticketStatus}
							/>
						</AttributesWrapper>
						<AttributesWrapper>
							<AttributesLabel label={"Priority :"} />
							<SelectItem
								register={register}
								label='ticket_priority'
								datas={ticketPriority}
							/>
						</AttributesWrapper>
						<AttributesWrapper>
							<AttributesLabel label={"Assigned :"} />
							<SelectItem
								register={register}
								label='assigned'
								datas={project.data?.attributes.collaborations}
								collab
							/>
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
					<div className='flex flex-col  justify-start gap-3'>
						<AttributesWrapper>
							<AttributesLabel label={"Estimated time :"} />
							<div className='flex items-center relative max-w-[120px]'>
								<Input
									placeholder='Ex: 34'
									type={"text"}
									name={"estimated_time_value"}
									defaultValue={0}
									register={register}
									errors={errors}
									validationsSchema={errorMessageValues.estimated_time}
								/>
								<SelectItem
									register={register}
									label='estimated_time_format'
									datas={timeFormat}
									time
								/>
							</div>
						</AttributesWrapper>
					</div>
				</div>
				<div>
					<Input
						placeholder='Describe your ticket ...'
						textarea
						name={"description"}
						register={register}
						errors={errors}
						validationsSchema={errorMessageValues.description}
					/>

					<input
						type='file'
						className='mt-3 block w-full text-14 text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-grey-text-placeholder font-regular hover:file:bg-blue-500 file:cursor-pointer '
						name='file'
						id='file'
						multiple={true}
						{...register("file")}
					/>
				</div>
				<Button type='submit' form='create' width={"fit"}>
					Submit
				</Button>
			</form>
		</div>
	);
}

export function SelectItem({
	label,
	datas,
	register,
	collab = false,
	time = false,
}) {
	console.log(datas?.data);
	console.log(label);

	if (collab) {
		return (
			<select
				name={"label"}
				{...register(label)}
				className='bg-transparent rounded-md text-grey-text-active py-2 px-3 text-14 cursor-pointer hover:bg-blue-700 border border-stroke-blue focus:outline-none'>
				{datas?.data.map((r) => {
					return (
						<option
							key={r.attributes.collaborator.data.id}
							value={r.attributes.collaborator.data.id}>
							{r.attributes.collaborator.data.attributes.username}
						</option>
					);
				})}
			</select>
		);
	} else {
		return (
			<select
				defaultValue={label === "ticket_status" && "2"}
				name={"label"}
				{...register(label)}
				className={`${
					time
						? "absolute  z-50 top-5 right-2 text-14 "
						: "relative border border-stroke-blue py-2 px-3 text-14"
				} bg-transparent rounded-md text-grey-text-active  cursor-pointer font-regular hover:bg-blue-700  focus:outline-none`}>
				{datas?.data.map((r) => {
					return (
						<option key={r.id} value={r.id}>
							{r.attributes.label}
						</option>
					);
				})}
			</select>
		);
	}
}

export function AttributesLabel({ label }) {
	return (
		<p className='text-14 font-regular text-grey-text-inactive min-w-[90px]'>
			{" "}
			{label}
		</p>
	);
}

export function AttributesWrapper({ children }) {
	return (
		<div className='flex items-center relative justify-between gap-2 min-w-[200px]'>
			{children}
		</div>
	);
}

export const timeFormat = {
	data: [
		{ attributes: { label: "Day" }, id: "d" },
		{ attributes: { label: "Hour" }, id: "h" },
		{ attributes: { label: "Min" }, id: "min" },
	],
};
