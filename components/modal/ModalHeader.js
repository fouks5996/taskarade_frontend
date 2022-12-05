import React from "react";
import Button from "../actions/Button";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import { AiOutlineSave } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

export default function ModalHeader({
	title,
	id,
	created,
	createdBy,
	handleDelete,
	edit,
}) {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<Heading size={"20"}>
					#{id} - {title}
				</Heading>
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
