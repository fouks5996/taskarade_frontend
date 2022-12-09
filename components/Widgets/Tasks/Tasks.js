import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import WidgetWrapper from "../WidgetWrapper";
import { BsPlus } from "react-icons/bs";
import { useCurrentTasks } from "../../../services/api/task";
import Task from "./Task";
import Text from "../../Typography/Text";
import { post, update } from "../../../services/config";
import { path } from "../../../services/routes";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Search from "../../Search/Search";
import { v4 as uuidv4 } from "uuid";

export default function Tasks() {
	const router = useRouter();
	const { pid, id } = router.query;
	const { data: session } = useSession();
	const { project, isLoading, mutate } = useCurrentProject(id);
	const { current_tasks, taskLoading1, mutateTask } = useCurrentTasks(pid);
	const [getId, setGetId] = useState(null);
	const [taskFilter, setTaskFilter] = useState({
		value: null,
		statusID: null,
	});
	const [modal, setModal] = useState({ state: false, data: null });

	if (isLoading || taskLoading1)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />
			</div>
		);
	if (current_tasks?.error?.status === 404) {
		router.push("/404?error=not_found");
	}

	const widget = project?.data?.attributes.project_widgets.data.find(
		(widget) => widget.id === parseInt(pid)
	);

	/* 	const onDragEvent = async (result) => {
		if (!result.destination) return;
		const { destination, draggableId } = result;
		const body = { data: { task_status: parseInt(destination.droppableId) } };
		const { success } = await update(
			path("UPDATE_task", parseInt(draggableId)),
			body
		);
		if (success) {
			mutateTask();
		}
	}; */

	return (
		<WidgetWrapper>
			{" "}
			<WidgetHeader
				name={widget?.attributes.name}
				widgetID={widget?.attributes.widget.data.id}
				type={"task"}
				onclick={() => setCreateTasks(true)}
				icon={<BsPlus />}
			/>
			<DndLogic
				taskStatus={current_tasks}
				session={session}
				mutateTask={mutateTask}
				getId={getId}
				setGetId={setGetId}
				setTaskFilter={setTaskFilter}
				taskFilter={taskFilter}
				pid={pid}
			/>
		</WidgetWrapper>
	);
}

export function DndLogic({
	taskStatus,
	mutateTask,
	setGetId,
	getId,
	setTaskFilter,
	taskFilter,
	session,
}) {
	const [taskdata, setTaskData] = useState(taskStatus);

	useEffect(() => {
		setTaskData(taskStatus);
	}, [taskStatus]);

	const onDragEnd = async (result) => {
		if (!result.destination) return;
		const { source, destination, draggableId } = result;
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = taskdata[parseInt(source.droppableId)];
			const destColumn = taskdata[parseInt(destination.droppableId)];
			const sourceItems = [...sourceColumn.tasks];
			const destItems = [...destColumn.tasks];
			const removed = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed[0]);
			taskdata[parseInt(destination.droppableId)].tasks = destItems;
			taskdata[parseInt(source.droppableId)].tasks = sourceItems;
			setTaskData([...taskdata]);

			const body = {
				data: { task_status: parseInt(destination.droppableId) + 1 },
			};
			const { success, error } = await update(
				path("UPDATE_task", parseInt(draggableId)),
				body
			);
			if (success) {
				mutateTask();
			} else {
				console.log("ERREUR");
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='flex gap-14 mt-6 max-w-[1200px]'>
				{taskdata
					.sort((a, b) => a.id - b.id)
					.map((section) => (
						<Droppable key={section.id} droppableId={`${section.id - 1}`}>
							{(provided, snapshot) => {
								return (
									<TaskStatusWrapper
										provided={provided}
										snapshot={snapshot}
										mutateTask={mutateTask}
										setTaskData={setTaskData}
										taskData={taskdata}
										session={session}
										setTaskFilter={setTaskFilter}
										status={section}>
										{section.tasks
											.filter((task) =>
												taskFilter.value !== "" &&
												taskFilter.colID === section.id
													? task.title
															.toLowerCase()
															.match(taskFilter.value.toLowerCase())
													: task
											)
											.map((task, index) => (
												<Draggable
													index={index}
													key={task.id}
													draggableId={`${task.id}`}>
													{(provided, snapshot) => {
														return (
															<Task
																id={section.id}
																provided={provided}
																snapshot={snapshot}
																getId={getId}
																setGetId={setGetId}
																task={task}
																mutateTask={mutateTask}
																setTaskData={setTaskData}
																taskdata={taskdata}
															/>
														);
													}}
												</Draggable>
											))}
										{provided.placeholder}
									</TaskStatusWrapper>
								);
							}}
						</Droppable>
					))}
			</div>
		</DragDropContext>
	);
}

export function TaskStatusWrapper({
	status,
	children,
	session,
	provided,
	snapshot,
	mutateTask,
	setTaskFilter,
	taskData,
	setTaskData,
}) {
	const router = useRouter();
	const { pid } = router.query;

	async function createTask(statusID) {
		const body = {
			data: {
				title: "New task ...",
				task_status: statusID,
				project_widget: parseInt(pid),
				task_owner: session.id,
			},
		};

		const colIndex = statusID - 1;
		const newTask = {
			title: "New task ...",
			createdAt: new Date(),
			project_widget: { data: { id: parseInt(pid) } },
			id: uuidv4(),
		};
		taskData[colIndex].tasks.push(newTask);
		setTaskData([...taskData]);

		const { success, error } = await post(path("CREATE_task"), body);
		if (success) {
			mutateTask();
		} else {
			console.log(error);
		}
	}

	function searchTask(Fvalue) {
		setTaskFilter({ value: Fvalue, colID: status.id });
	}

	return (
		<div
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				background: snapshot.isDraggingOver ? "transparent" : "transparent",
			}}
			className='flex flex-col gap-2 w-full  min-w-[280px]'>
			<div className='flex items-center px-2 justify-between  pr-2'>
				<div
					style={{
						backgroundColor: status.bg_color,
						color: status.text_color,
					}}
					className='py-1 px-2 font-medium text-14 rounded-md w-fit '>
					{status.label}
				</div>
				<Search onchange={searchTask} label={"a task"} />
			</div>
			<div className='mt-3 px-2   flex flex-col gap-2'> {children} </div>
			<div
				onClick={() => createTask(status.id)}
				className='flex items-center gap-1 cursor-pointer'>
				<span className='text-20'>
					{" "}
					<BsPlus />{" "}
				</span>
				<Text hoverUnderline size={"14"}>
					{" "}
					New{" "}
				</Text>
			</div>
		</div>
	);
}
