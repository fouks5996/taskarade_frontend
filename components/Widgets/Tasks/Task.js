import Text from "../../Typography/Text";
import { FiEdit2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { remove, update } from "../../../services/config";
import { path } from "../../../services/routes";
import { FiTrash2 } from "react-icons/fi";

export default function Task({
	task,
	setGetId,
	getId,
	mutate,
	provided,
	snapshot,
	setData,
	data,
	id,
}) {
	const { data: session } = useSession();
	const jwt = session?.jwt;

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
		const { success } = await update(path("UPDATE_task", task.id), body, jwt);

		if (success) {
			await mutate();
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
		return remove(path("DELETE_task", task.id), mutate, jwt);
	}

	return (
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
						className='flex items-center w-full justify-between gap-2  rounded-md'
						onSubmit={updateTask}>
						<div className='flex items-center gap-2'>
							<input
								id={id}
								name='task'
								className='italic w-fit h-fit bg-transparent focus:outline-none text-grey-text-active text-14'
								autoFocus={true}
								defaultValue={task.attributes.title}
								type='text'
							/>
						</div>
						<div>
							<button className='text-grey-text-inactive text-14' type='submit'>
								{" "}
								Edit{" "}
							</button>
						</div>
					</form>
				) : (
					<>
						{" "}
						<Text size={"14"}> {task.attributes.title} </Text>
						<div
							className={`text-grey-text-inactive group-hover:flex hidden font-regular text-13  items-center gap-3`}>
							<span
								className='cursor-pointer'
								onClick={() => setGetId(task.id)}>
								<FiEdit2 />{" "}
							</span>
							<span className='cursor-pointer' onClick={() => deleteTask(id)}>
								{" "}
								<FiTrash2 />{" "}
							</span>
						</div>
					</>
				)}
			</div>
			<span className='h-[26px]'> </span>
			<span className='absolute bottom-2 right-2 text-12 font-regular text-grey-text-inactive'>
				{" "}
				{new Date(task.attributes.createdAt).toLocaleDateString("fr-FR", {
					hour: "2-digit",
					minute: "2-digit",
				})}{" "}
			</span>
		</div>
	);
}
