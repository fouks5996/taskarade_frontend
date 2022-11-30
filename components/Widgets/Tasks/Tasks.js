import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCurrentProject } from "../../../services/api/project";
import Layout from "../../Layout/Layout";
import Loader from "../../Loader/Loader";
import WidgetHeader from "../WidgetHeader";
import WidgetWrapper from "../WidgetWrapper";
import { BsPlus } from "react-icons/bs";
import { useTaskStatus } from "../../../services/api/task";
import Task from "./Task";
import Text from "../../Typography/Text";
import { post, update } from "../../../services/config";
import { path } from "../../../services/routes";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RiSearchLine } from "react-icons/ri";

export default function Tasks() {
	const router = useRouter();
	const { pid, id } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const { project, isLoading, mutate } = useCurrentProject(jwt, id);
	const { taskStatus, taskLoading } = useTaskStatus(jwt);
	const [getId, setGetId] = useState(null);
	if (isLoading && taskLoading)
		return (
			<Layout>
				<div className='flex h-full justify-center items-center'>
					<Loader type='spin' height={40} width={40} />
				</div>
			</Layout>
		);

	const widget = project?.data?.attributes.project_widgets.data.find(
		(widget) => widget.id === parseInt(pid)
	);

	const onDragEvent = async (result) => {
		if (!result.destination) return;
		const { destination, draggableId } = result;
		const body = { data: { task_status: parseInt(destination.droppableId) } };
		const { success } = await update(
			path("UPDATE_task", parseInt(draggableId)),
			body,
			jwt
		);
		if (success) {
			mutate();
		}
	};

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
			{
				<DragDropContext onDragEnd={(result) => onDragEvent(result)}>
					<div className='flex gap-14 mt-6 max-w-[1200px]'>
						{taskStatus?.data
							.sort((a, b) => a.id - b.id)
							.map((status) => (
								<Droppable key={status.id} droppableId={`${status.id}`}>
									{(provided, snapshot) => {
										return (
											<TaskStatusWrapper
												provided={provided}
												snapshot={snapshot}
												mutate={mutate}
												jwt={jwt}
												status={status}>
												{widget?.attributes.tasks?.data
													.filter(
														(task) =>
															task.attributes.task_status.data.id === status.id
													)
													.map((task, index) => (
														<Draggable
															index={index}
															key={task.id}
															draggableId={`${task.id}`}>
															{(provided, snapshot) => {
																return (
																	<Task
																		provided={provided}
																		snapshot={snapshot}
																		getId={getId}
																		setGetId={setGetId}
																		task={task}
																		mutate={mutate}
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
			}
			{/* 			<DndLogic
				taskStatus={taskStatus?.data}
				mutate={mutate}
				jwt={jwt}
				getId={getId}
				setGetId={setGetId}
				pid={pid}
			/> */}
		</WidgetWrapper>
	);
}

/* export function DndLogic({ taskStatus, mutate, jwt, setGetId, getId, pid }) {
	const [data, setData] = useState();

	useEffect(() => {
		setData(taskStatus);
	}, [taskStatus]);

	const onDragEnd = async (result) => {
		if (!result.destination) return;
		const { source, destination, draggableId } = result;
		if (source.droppableId !== destination.droppableId) {
			const sourceColIndex = data.findIndex(
				(section) => parseInt(section.id + pid) === parseInt(source.droppableId)
			);
			const destinationColIndex = data.findIndex(
				(section) =>
					parseInt(section.id + pid) === parseInt(destination.droppableId)
			);

			const sourceCol = data[sourceColIndex];
			const destinationCol = data[destinationColIndex];
			const sourceTask = [...sourceCol.attributes.tasks.data];
			const destinationTask = [...destinationCol.attributes.tasks.data];
			const [removed] = sourceTask.splice(sourceColIndex, 1);
			destinationTask.splice(destinationColIndex, 0, removed);
			data[sourceColIndex].attributes.tasks.data = sourceTask;
			data[destinationColIndex].attributes.tasks.data = destinationTask;
			setData(data);

			const body = {
				data: { task_status: parseInt(destination.droppableId.charAt(0)) },
			};
			const { success } = await update(
				path("UPDATE_task", parseInt(draggableId)),
				body,
				jwt
			);
			if (success) {
				mutate();
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='flex gap-14 mt-6 max-w-[1200px]'>
				{data &&
					data
						.sort((a, b) => a.id - b.id)
						.map((section) => (
							<Droppable key={section.id} droppableId={`${section.id + pid}`}>
								{(provided, snapshot) => {
									return (
										<TaskStatusWrapper
											provided={provided}
											snapshot={snapshot}
											mutate={mutate}
											jwt={jwt}
											setData={setData}
											data={data}
											status={section}>
											{section.attributes.tasks?.data
												.filter(
													(res) =>
														res.attributes.project_widget.data?.id ===
														parseInt(pid)
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
																	mutate={mutate}
																	setData={setData}
																	data={data}
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
} */

export function TaskStatusWrapper({
	status,
	children,
	jwt,
	mutate,
	provided,
	snapshot,
	data,
	setData,
}) {
	const router = useRouter();
	const { pid } = router.query;
	async function createTask(statusID) {
		const body = {
			data: {
				title: "New task ...",
				task_status: statusID,
				project_widget: parseInt(pid),
			},
		};
		const { success, error } = await post(path("CREATE_task"), body, jwt);
		if (success) {
			/* 			const colIndex = statusID - 1;
			const newTask = {
				attributes: {
					title: "New task ...",
					createdAt: new Date(),
					project_widget: { data: { id: parseInt(pid) } },
				},
				id: success.data.id,
			};
			data[colIndex].attributes.tasks.data.push(newTask);
			setData(data); */
			mutate();
		} else {
			console.log(error);
		}
	}

	return (
		<div
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				background: snapshot.isDraggingOver ? "transparent" : "transparent",
			}}
			className='flex flex-col  gap-2 w-full overflow-y-scroll min-h-[68%] max-h-[700px] min-w-[280px]'>
			<div className='flex items-center px-2 justify-between  pr-2'>
				<div
					style={{
						backgroundColor: status.attributes.bg_color,
						color: status.attributes.text_color,
					}}
					className='py-1 px-2 font-medium text-14 rounded-md w-fit '>
					{status.attributes.label}
				</div>
				<p className='text-20 cursor-pointer hover:text-grey-text-active text-grey-text-placeholder peer-focus:text-grey-text-active'>
					<RiSearchLine />
				</p>
			</div>
			<div className='mt-3 px-2 overflow-y-scroll  max-h-[68%] flex flex-col gap-2'>
				{" "}
				{children}{" "}
			</div>
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
