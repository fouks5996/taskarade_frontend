import Text from "../../Typography/Text";
import { FiEdit2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { remove, update } from "../../../services/config";
import { path } from "../../../services/routes";
import { FiTrash2 } from "react-icons/fi";
import TaskModal from "../../modal/TaskModal";
import { useState } from "react";
import TaskTag from "./TaskTag";
import { v4 as uuidv4 } from "uuid";

export default function Task({
	task,
	setGetId,
	getId,
	mutateTask,
	provided,
	snapshot,
	setData,
	data,
	id,
}) {
	const { data: session } = useSession();
	const [modal, setModal] = useState({ state: false, data: null });

	async function updateTask(e) {
		e.preventDefault();

		/* 		const value = e.target.task.value;

		const getColIndex = () => {
			if (e.target.task.id === "3") return 2;
			if (e.target.task.id === "2") return 1;
			if (e.target.task.id === "1") return 0;
		};

		const colIndex = getColIndex();
		const finalCol = data[colIndex];

		const taskToAdd = [...finalCol.attributes.tasks.data];
		const indexOfTask = taskToAdd.findIndex((res) => res.id === task.id);

		taskToAdd[indexOfTask].attributes.title = value;

		data[getColIndex()].attributes.tasks.data = taskToAdd;

		setData(data); */

		const body = {
			data: { title: e.target.task.value },
		};
		const { success } = await update(path("UPDATE_task", task.id), body);

		if (success) {
			await mutateTask();
			setGetId(!task.id);
		} else {
			alert("erreur");
		}
	}

	function deleteTask(colId) {
		/* 		const getColIndex = () => {
			if (colId === 3) return 2;
			if (colId === 2) return 1;
			if (colId === 1) return 0;
		};

		const ColIndex = getColIndex();
		const NewCol = data[ColIndex].attributes.tasks.data.filter(
			(t) => parseInt(t.id) !== parseInt(task.id)
		);
		data[ColIndex].attributes.tasks.data = NewCol;
		setData(data); */
		return remove(path("DELETE_task", task.id), mutateTask);
	}

	return (
		<>
			<div
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				style={{
					userSelect: "none",
					...provided.draggableProps.style,
				}}
				className={`p-3 flex group relative flex-col ${
					snapshot.isDragging ? "opacity-50" : "opacity-100"
				} bg-blue-500 rounded-md cursor-pointer hover:scale-[1.02] transition-all`}>
				<div className='flex justify-between'>
					{getId === task.id ? (
						<form
							className='flex items-center w-full mb-6 justify-between gap-2  rounded-md'
							onSubmit={updateTask}>
							<input
								onFocus={(e) => e.target.select()}
								id={id}
								name='task'
								className='italic w-fit h-fit bg-transparent focus:outline-none text-grey-text-active text-14'
								autoFocus={true}
								defaultValue={task.title}
								type='text'
							/>
							<div>
								<button
									className='text-grey-text-inactive text-14'
									type='submit'>
									{" "}
									Edit{" "}
								</button>
							</div>
						</form>
					) : (
						<>
							<div
								onClick={() => setModal({ state: true, data: task })}
								className='flex flex-col  w-full'>
								<div className='flex items-center justify-between w-full'>
									<Text size={"14"}> {task.title} </Text>

									<div className=' block h-[29px] w-[54px]'> </div>
								</div>
								<div className='flex items-center gap-2 mt-5'>
									{task.task_tags.map((tag) => {
										return (
											<TaskTag
												id={tag.id}
												key={uuidv4()}
												label={tag.label}
												bg_color={tag.tag_bg.color}
											/>
										);
									})}
								</div>
							</div>
							<div
								className={`text-grey-text-inactive group-hover:flex hidden absolute z-50 top-1 right-0 p-2 font-regular text-13  items-center`}>
								<span
									className='cursor-pointer hover:bg-status-in_progress_text p-2 rounded-full'
									onClick={() => {
										setGetId(task.id), setModal({ state: false, data: task });
									}}>
									<FiEdit2 />{" "}
								</span>
								<span
									className='cursor-pointer hover:bg-status-in_progress_text p-2 rounded-full'
									onClick={() => deleteTask()}>
									{" "}
									<FiTrash2 />{" "}
								</span>
							</div>
						</>
					)}
				</div>
				<span className='absolute bottom-2 right-2 text-12 font-regular text-grey-text-inactive'>
					{" "}
					{new Date(task.createdAt).toLocaleDateString("fr-FR")}
				</span>
			</div>
			{modal.state && (
				<TaskModal mutateTask={mutateTask} setModal={setModal} task={task} />
			)}
		</>
	);
}
