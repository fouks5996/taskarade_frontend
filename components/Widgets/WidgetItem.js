import { useEffect, useState } from "react";
import { getIcon } from "../Icons/GetIcon";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import Input from "../Forms/Input";
import { getRoot, remove, update } from "../../services/config";
import { useSession } from "next-auth/react";
import { path } from "../../services/routes";
import { useRouter } from "next/router";
import Link from "next/link";
import string_to_slug from "../functions/Slugify";
import getMinId from "../functions/GetMinId";
import Alert from "../modal/Alert";

export default function WidgetItem({
	widgets,
	widget,
	getId,
	setGetId,
	mutate,
}) {
	const { data: session } = useSession();
	const [active, setActive] = useState(false);
	const router = useRouter();
	const { id, q } = router.query;
	const [alert, setAlert] = useState({
		active: false,
		content: "",
	});

	useEffect(() => {
		if (router.asPath.includes(`/project/${id}/widget/${widget.id}`)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [router, setActive, id, widget]);

	async function updateProject(e) {
		e.preventDefault();
		const body = {
			data: { name: e.target.widget.value },
		};
		const { success } = await update(
			path("UPDATE_widget", widget.id),
			body,
			session.jwt
		);

		if (success) {
			await mutate();
			setGetId(!widget.id);
		} else {
			alert("erreur");
		}
	}

	async function deleteWidget() {
		if (widgets.data.length !== 1) {
			await remove(path("DELETE_widget", widget.id), mutate, session.jwt);
			const minId = getMinId(widgets.data);
			return router.push(`/project/${id}/widget/${minId}`);
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
							defaultValue={widget.attributes.name}
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
								{widget.attributes.name}
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
