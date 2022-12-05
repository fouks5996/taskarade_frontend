import React, { useEffect } from "react";
import Text from "../../Typography/Text";
import { FiTrash2 } from "react-icons/fi";
import { remove } from "../../../services/config";
import { path } from "../../../services/routes";
import { useSession } from "next-auth/react";
import Button from "../../actions/Button";
import { BsPlus } from "react-icons/bs";

export default function ListNotes({ notes, active, setActive, mutate }) {
	function deleteNote(id) {
		remove(path("DELETE_note", id), mutate);
	}

	if (notes?.data.length === 0)
		return (
			<div className='min-w-[242px] max-w-[242px] h-full  flex items-center flex-col gap-3 pr-5 border-r border-stroke-blue'>
				<Text center> No notes </Text>
			</div>
		);

	return (
		<div className='min-w-[242px] h-full flex flex-col gap-1 pr-5 border-r border-stroke-blue'>
			{notes?.data.map((note) => (
				<div
					key={note.id}
					className={`py-2 px-3 ${
						active === note.id
							? "bg-blue-500 border border-stroke-blue"
							: "hover:bg-blue-600 border border-transparent"
					}  rounded-md cursor-pointer group`}>
					<div className='flex items-center justify-between gap-1'>
						<div
							onClick={() => setActive(note.id)}
							className='flex flex-col gap-1 w-full'>
							<Text size={"14"} medium>
								{" "}
								{note.attributes.title.substr(0, 20) + "..."}{" "}
							</Text>
							<Text size={"12"} medium color={"inactive"}>
								{" "}
								{new Date(note.attributes.updatedAt).toLocaleDateString(
									"fr-FR",
									{
										hour: "2-digit",
										minute: "2-digit",
									}
								)}
							</Text>
						</div>
						<span
							className='text-13 hidden text-grey-text-inactive group-hover:block'
							onClick={() => deleteNote(note.id)}>
							{" "}
							<FiTrash2 />{" "}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
