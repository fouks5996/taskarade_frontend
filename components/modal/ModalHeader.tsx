import React, { useState } from "react";
import Button from "../actions/Button";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import { AiOutlineSave } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { EditButton } from "./TicketModal";
import { errorMessageValues } from "../Forms/Errors";
import { useForm } from "react-hook-form";
import Input from "../Forms/Input";

interface ModalHeaderProps {
	title: string;
	id: number;
	created: string;
	createdBy: string;
	handleDelete: Function;
	edit: any;
	setTitleState?: Function;
	titleState?: string;
}

export default function ModalHeader({
	title,
	id,
	created,
	createdBy,
	handleDelete,
	edit,
	setTitleState,
	titleState,
}: ModalHeaderProps) {
	const [getter, setter] = useState();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	function onEditField(key: string, value: string) {
		setTitleState(value);
	}

	function SubmitData() {
		if (getter) {
			setTitleState(titleState);
		}
	}

	return (
		<div className='flex items-center justify-between'>
			<div>
				<div className='flex items-center gap-2'>
					<Heading size={"20"}>#{id} -</Heading>
					{getter ? (
						<input
							className='focus:bg-transparent bg-transparent mb-1 focus:text-grey-text-active focus:outline-none text-grey-text-inactive focus:border-b border-b border-stroke-blue focus:border-stroke-blue'
							value={titleState}
							onChange={(e) => onEditField("title", e.target.value)}
							name={"title"}
							autoFocus={true}
						/>
					) : (
						<Heading size={"20"}>{titleState} </Heading>
					)}
					<span onClick={() => SubmitData()}>
						<EditButton setter={setter} />{" "}
					</span>
				</div>
				<Text regular color={"inactive"} size='14'>
					Created at{" "}
					{new Date(created).toLocaleDateString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
					by{" "}
					<span className='text-14 font-regular text-grey-text-active'>
						{" "}
						{createdBy}{" "}
					</span>
				</Text>
			</div>
			<div className='flex  justify-between gap-2'>
				<Button size='iconOnly' type='submit' form={edit}>
					<span className='text-grey-text-active text-20'>
						<AiOutlineSave />
					</span>
				</Button>
				<Button size='iconOnly' onclick={() => handleDelete()} attent='warning'>
					<span className='text-grey-text-inactive text-18'>
						<FiTrash2 />
					</span>
				</Button>
			</div>
		</div>
	);
}
