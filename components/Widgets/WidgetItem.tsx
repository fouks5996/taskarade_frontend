import { useEffect, useState } from "react";
import { getIcon } from "../Icons/GetIcon";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { remove, update } from "../../services/config";
import { useSession } from "next-auth/react";
import { path } from "../../services/routes";
import { useRouter } from "next/router";
import Link from "next/link";
import string_to_slug from "../functions/Slugify";
import Alert from "../modal/Alert";
import { AlertTypes, queryTypes } from "next/app";

export default function WidgetItem({
	widgets,
	widget,
	getId,
	setGetId,
	mutate,
}) {
	const [active, setActive] = useState<boolean>(false);
	const [newData, setNewData] = useState<string>(widget.attributes.name);
	const router = useRouter();
	const { id, pid } = router.query as queryTypes;
	const [alert, setAlert] = useState<AlertTypes>({
		active: false,
		content: "",
	});

	console.log(newData);

	useEffect(() => {
		if (router.asPath.includes(`/project/${id}/widget/${widget.id}`)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [router, setActive, id, widget]);

	async function updateProject(e: React.SyntheticEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			widget: { value: string };
		};
		setNewData(target.widget.value);
		const body = {
			data: { name: target.widget.value },
		};
		const { success } = await update(path("UPDATE_widget", widget.id), body);

		if (success) {
			await mutate();
			setGetId(!widget.id);
		} else {
			setNewData(widget.attributes.name);
			setAlert({
				active: false,
				content: "",
			});
		}
	}

	async function deleteWidget() {
		if (widgets.data.length !== 1) {
			await remove(path("DELETE_widget", widget.id), mutate);
			return router.push(
				`/project/${id}/widget/${
					widgets.data[widget.id === widgets.data[0].id ? 1 : 0].id
				}`
			);
		} else {
			setAlert({ active: true, content: "Minimum 1 widget" });
		}
	}

	return (
		<>
			{getId === widget.id ? (
				<form
					className='flex items-center gap-2 py-2 px-2 bg-blue-900 rounded-md'
					onSubmit={updateProject}>
					<div className='flex items-center gap-2'>
						<p className='group-hover:text-grey-text-active text-grey-text-inactive text-20'>
							{getIcon(widget.attributes.widget.data.id)}
						</p>
						<input
							onFocus={(e) => e.target.select()}
							name='widget'
							className='italic bg-transparent focus:outline-none text-grey-text-inactive text-13'
							autoFocus={true}
							defaultValue={newData}
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
				<div
					className={`cursor-pointer ${
						active
							? "bg-blue-500 border border-stroke-blue"
							: "bg-transparent hover:bg-blue-900 border border-transparent"
					} group max-h-[38px] min-h-[38px] flex items-center justify-between  bg-transparent group  py-1.5 px-2 rounded-md`}>
					<Link
						href={`/project/${id}/widget/${widget.id}`}
						as={`/project/${id}/widget/${widget.id}?q=${string_to_slug(
							widget.attributes.name
						)}`}>
						<div className='flex items-center gap-2 w-full'>
							{getIcon(widget.attributes.widget.data.id)}

							<p
								className={`${
									active ? "text-grey-text-active" : "text-grey-text-inactive"
								} font-regular text-14 w-full group-hover:text-grey-text-active `}>
								{newData}
							</p>
						</div>
					</Link>
					<div
						className={`text-grey-text-inactive group-hover:flex hidden font-regular text-13  items-center gap-3`}>
						<span onClick={() => setGetId(widget.id)}>
							<FiEdit2 />{" "}
						</span>
						<span onClick={() => deleteWidget()}>
							{" "}
							<FiTrash2 />{" "}
						</span>
					</div>
				</div>
			)}
			<Alert alert={alert} setAlert={setAlert} />
		</>
	);
}
