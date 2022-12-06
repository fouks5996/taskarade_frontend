import React, { useEffect, useState } from "react";
import Text from "../Typography/Text";
import ModalLayout from "./ModalLayout";
import ModalHeader from "./ModalHeader";
import Input from "../Forms/Input";
import { useForm } from "react-hook-form";
import { errorMessageValues } from "../Forms/Errors";
import TaskTag from "../Widgets/Tasks/TaskTag";
import { remove, update } from "../../services/config";
import { path } from "../../services/routes";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import TagModal from "./TagModal";

interface TaskModalProps {
	setModal: Function;
	task: {
		body: string;
		createdAt: string;
		id: number;
		title: string;
		task_status: {
			label: string;
		};
		task_owner: {
			username: string;
		};
		task_tags: any;
		project_widget: {
			task_tags: [];
		};
	};
	mutateTask: any;
}

export default function TaskModal({
	setModal,
	task,
	mutateTask,
}: TaskModalProps) {
	const [tagsState, setTagsState] = useState(task.task_tags);
	const [modalTag, setModalTag] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	async function deleteTask() {
		await remove(path("UPDATE_task", task.id), mutateTask);
		setModal(false);
	}

	async function handleDeleteTag(id: number) {
		const tagTodelete = tagsState.filter(
			(tag: { id: number }) => tag.id !== id
		);
		const body = { data: { task_tags: tagTodelete } };
		const { success, error } = await update(path("UPDATE_task", task.id), body);
		if (success) {
			setTagsState(tagTodelete);
			mutateTask();
		} else {
			console.log(error);
		}
	}

	useEffect(() => {
		if (tagsState.length >= 3) return setModalTag(false);
	}, [tagsState]);

	async function onSubmit(data) {
		const body = { data: { body: data.body } };
		const { success, error } = await update(path("UPDATE_task", task.id), body);
		if (success) {
			setModal(false);
			mutateTask();
		} else {
			console.log(error);
		}
	}

	return (
		<ModalLayout setModal={setModal}>
			<ModalHeader
				title={task.title}
				id={task.id}
				created={task.createdAt}
				createdBy={task.task_owner.username}
				edit='task-edit'
				handleDelete={deleteTask}
			/>
			<div className='mt-6'>
				<div className='flex items-center gap-2 mb-2'>
					<Text size={"14"} color={"inactive"}>
						Status :
					</Text>
					<Text size={"14"} color={"active"}>
						{task.task_status.label}
					</Text>
				</div>

				<div className='flex items-center gap-2 w-fit relative my-4'>
					<Text size={"14"} color={"inactive"}>
						Tags :
					</Text>
					<div className='flex items-center h-[30px] gap-2 text-12 font-medium text-grey-text-active'>
						{tagsState.map(
							(tag: {
								id: number;
								label: string;
								tag_bg: { color: string };
							}) => {
								return (
									<TaskTag
										id={tag.id}
										key={uuidv4()}
										label={tag.label}
										bg_color={tag.tag_bg.color}
										deleteTask
										handleDelete={handleDeleteTag}
									/>
								);
							}
						)}
						{tagsState.length >= 3 ? (
							<p> Max : 3. Delete some tags to add </p>
						) : (
							<p
								className='px-3 py-1.5 border border-stroke-blue text-12 rounded-lg cursor-pointer hover:bg-status-in_progress_text'
								onClick={() => setModalTag((modalTag) => !modalTag)}>
								Add a tag
							</p>
						)}
					</div>
					{modalTag && (
						<TagModal
							tags={task.project_widget.task_tags}
							tagsState={tagsState}
							setTagsState={setTagsState}
							mutateTask={mutateTask}
							task={task}
						/>
					)}
				</div>
			</div>
			<form
				id='task-edit'
				className='pt-8 border-t border-stroke-blue'
				onSubmit={handleSubmit(onSubmit)}>
				<Input
					defaultValue={task.body}
					placeholder='Describe your task ...'
					textarea
					name={"body"}
					register={register}
					errors={errors}
					validationsSchema={errorMessageValues.description}
				/>
			</form>
		</ModalLayout>
	);
}
