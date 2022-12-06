import React, { useState } from "react";
import TagOptions from "../Widgets/Tasks/TagOptions";
import TaskTag from "../Widgets/Tasks/TaskTag";
import { v4 as uuidv4 } from "uuid";
import { post, remove, update } from "../../services/config";
import { path } from "../../services/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Text from "../Typography/Text";
import { useTagBg } from "../../services/api/task";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { queryTypes } from "next/app";

interface TagModalProps {
	tags: {
		id: number;
		label: string;
		tag_bg: {
			id: number;
			color: string;
		};
	}[];
	tagsState: {
		id: number;
	}[];
	setTagsState: Function;
	mutateTask: any;
	task: {
		id: number;
	};
}

export default function TagModal({
	tags,
	tagsState,
	setTagsState,
	mutateTask,
	task,
}: TagModalProps) {
	const [optionsModal, setOptionsModal] = useState<number>(null);
	const router = useRouter();
	const { pid } = router.query as queryTypes;
	const { tag_bg, taskLoading1 } = useTagBg();

	const refOption = useRef(null);

	useOnClickOutside(refOption, () => setOptionsModal(900000 * Math.random()));

	if (taskLoading1) return <p> Loading </p>;

	let yFilter = tagsState.map((tag: { id: any }) => {
		return tag.id;
	});

	const emptyInput = () => {
		let input = (document.getElementById("toDelete") as HTMLInputElement).value;
		return (input = "");
	};

	async function createTag(e: React.SyntheticEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			tags: { value: string };
		};
		const body = {
			data: {
				label: target.tags.value,
				text_color: "#FFFFFF",
				bg_color: "#4945FF",
				tag_bg: 1,
				project_widget: parseInt(pid),
			},
		};
		const { success, error } = await post(path("CREATE_task-tag"), body);
		if (success) {
			mutateTask();
			emptyInput();
		} else {
			console.log(error);
		}
	}

	async function handleAddTag(id: any) {
		const tagToAdd = tags.filter((tag: { id: any }) => tag.id === id);
		const allTags = [...tagsState, tagToAdd[0]];
		const body = { data: { task_tags: allTags } };
		const { success, error } = await update(path("UPDATE_task", task.id), body);
		if (success) {
			setTagsState([...tagsState, tagToAdd[0]]);
			mutateTask();
		} else {
			console.log(error);
		}
	}

	async function EditTagColor(bgID: any, tagbgID: string | number) {
		const body = { data: { tag_bg: bgID } };
		const { success } = await update(path("UPDATE_task-tag", tagbgID), body);
		if (success) {
			mutateTask();
		} else {
			console.log("erreur");
		}
	}

	const onSubmit = async (e: React.SyntheticEvent, tagbgID: number) => {
		const target = e.target as typeof e.target & {
			task_tag: { value: string };
		};
		e.preventDefault();
		const body = { data: { label: target.task_tag.value } };
		const { success } = await update(path("UPDATE_task-tag", tagbgID), body);
		if (success) {
			mutateTask();
			setOptionsModal(900000 * Math.random());
		} else {
			console.log("erreur");
		}
	};

	const deleteTag = async (tagID: string | number) => {
		await remove(path("DELETE_task-tag", tagID), mutateTask);
	};

	return (
		<div className='flex flex-col  w-full gap-4 text-16 font-medium min-w-[270px] max-w-[280px] absolute left-10 top-10 bg-blue-600 rounded-md py-4 px-4 border border-stroke-blue'>
			<div className='flex flex-col w-full text-14 font-medium'>
				{tags
					.filter((tag: { id: number }) => !yFilter.includes(tag.id))
					.map((tag) => (
						<div
							className='py-1.5 px-2 w-full relative flex items-center justify-between rounded-md hover:bg-blue-700 cursor-pointer'
							key={uuidv4()}>
							<TaskTag
								id={tag.id}
								label={tag.label}
								bg_color={tag.tag_bg.color}
								addTask
								handleAdd={handleAddTag}
							/>
							<TagOptions setOptionsModal={setOptionsModal} tag={tag} />
							{optionsModal === tag.id && (
								<div
									ref={refOption}
									className='bg-blue-600 absolute max-w-[174px] flex flex-col items-center gap-4 -right-20 top-8 z-50 rounded-md p-2 border border-stroke-blue'>
									<form onSubmit={(e) => onSubmit(e, tag.id)}>
										<input
											maxLength={13}
											autoFocus
											defaultValue={tag.label}
											placeholder='Rename your tag ... '
											name='task_tag'
											className={`h-[35px] transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-700 w-full pl-3  placeholder:text-grey-text-placeholder placeholder:text-12 placeholder:font-regular`}
										/>
									</form>
									<div className=' flex gap-2'>
										{tag_bg.data.map((bg: { id: number }) => {
											return (
												<TagDot
													key={bg.id}
													bg={bg}
													tag={tag}
													EditTagColor={EditTagColor}
												/>
											);
										})}
									</div>
									<Text
										onclick={() => deleteTag(tag.id)}
										size={"14"}
										hoverUnderline
										color='red'>
										Delete your tag
									</Text>
								</div>
							)}
						</div>
					))}
			</div>
			<form onSubmit={(e) => createTag(e)}>
				<input
					maxLength={13}
					autoFocus
					id='toDelete'
					placeholder='Create your tag ... '
					name={"tags"}
					className={`h-[35px] transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-700 w-full pl-3  placeholder:text-grey-text-placeholder placeholder:text-12 placeholder:font-regular`}
				/>
			</form>
		</div>
	);
}

export function TagDot({ bg, tag, EditTagColor }) {
	return (
		<div key={bg.id} className='flex items-center gap-2 relative'>
			<input
				type='radio'
				id={bg.id}
				defaultChecked={tag.tag_bg?.id === bg.id ? true : false}
				value={bg.id}
				className='hidden peer'
				name={"tag_bg"}
				onChange={() => EditTagColor(bg.id, tag.id)}
			/>
			<label
				htmlFor={bg.id}
				style={{ backgroundColor: bg.attributes.color }}
				className='inline-flex h-5 w-5 justify-between rounded-lg items-center  cursor-pointer  peer-checked:border  peer-checked:border-purple_dark'></label>
		</div>
	);
}
