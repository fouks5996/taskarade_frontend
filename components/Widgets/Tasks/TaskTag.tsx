import React from "react";
import { BsPlus } from "react-icons/bs";
import { MdClose } from "react-icons/md";

interface TaskTagProps {
	label: string;
	id: number;
	bg_color: string;
	addTask?: boolean;
	deleteTask?: boolean;
	handleDelete?: Function;
	handleAdd?: Function;
}

export default function TaskTag({
	label,
	id,
	bg_color,
	addTask,
	deleteTask,
	handleDelete,
	handleAdd,
}: TaskTagProps) {
	return (
		<div
			style={{
				backgroundColor: bg_color,
				color: "white",
			}}
			className='flex w-fit gap-1 items-center justify-center py-1 px-2 rounded-lg'>
			<span className='text-12 font-medium'> {label} </span>
			{addTask && (
				<span
					onClick={() => handleAdd(id)}
					className='text-20 cursor-pointer hover:scale-110'>
					{" "}
					<BsPlus />{" "}
				</span>
			)}
			{deleteTask && (
				<span
					onClick={() => handleDelete(id)}
					className='cursor-pointer hover:scale-110 text-18 mb-0.5'>
					{" "}
					<MdClose />{" "}
				</span>
			)}
		</div>
	);
}
