import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { update } from "../../../services/config";
import { path } from "../../../services/routes";
import Text from "../../Typography/Text";

export default function ContentNotes({ activeNote, mutate }) {
	if (!activeNote)
		return (
			<div className=''>
				{" "}
				<Text> No note selected </Text>{" "}
			</div>
		);

	async function onEditField(target, value) {
		const body = { data: { [target]: value } };

		const { success, error } = await update(
			path("UPDATE_note", activeNote.id),
			body
		);

		if (success) return mutate();
		if (error) return alert("erreur");
	}

	return (
		<div key={`default:${activeNote.attributes.title}`} className='w-full '>
			<input
				className='block text-20 font-sb text-grey-text-active w-full pl-2 bg-transparent focus:outline-none placeholder:font-regular placeholder:text-14 placeholder:text-grey-text-placeholder'
				defaultValue={activeNote.attributes.title}
				onChange={(e) => onEditField("title", e.target.value)}
				placeholder='Votre titre ...'
				onInput={(e) =>
					!e.target.autoFocus
						? e.target.autoFocus === true
						: e.target.autoFocus === false
				}
				type={"text"}
				autoFocus={true}
			/>

			<textarea
				className='block w-full h-full p-2 resize-none bg-transparent text-grey-text-active text-14 placeholder:text focus:outline-none placeholder:font-regular placeholder:text-14 placeholder:text-grey-text-placeholder'
				defaultValue={activeNote.attributes.content}
				onChange={(e) => onEditField("content", e.target.value)}
				placeholder='Laisser libre court à votre imagination ...'
				autoFocus={false}
			/>
		</div>
	);
}
