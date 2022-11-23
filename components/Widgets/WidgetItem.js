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

export default function WidgetItem({ widget, getId, setGetId, mutate }) {
	const { data: session } = useSession();
	const [active, setActive] = useState(false);
	const router = useRouter();
	const { id } = router.query;

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

	function deleteWidget() {
		remove(path("DELETE_widget", widget.id), mutate, session.jwt);
		router.push(`/project/${id}`);
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
					} group   flex items-center justify-between  bg-transparent group  py-2 px-2 rounded-md`}>
					<Link
						href={`/project/${id}/widget/${
							widget.id
						}?q=${widget.attributes.name.toLowerCase()}`}>
						<div className='flex items-center gap-2 w-full'>
							<p
								className={`group-hover:text-grey-text-active ${
									active ? "text-grey-text-active" : "text-grey-text-inactive"
								}  text-20`}>
								{getIcon(widget.attributes.widget.data.id)}
							</p>

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
		</>
	);
}
