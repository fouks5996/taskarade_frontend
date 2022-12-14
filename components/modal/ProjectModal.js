import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { mutate } from "swr";
import { useCurrentProject } from "../../services/api/project";
import { useCurrentUser } from "../../services/api/user";
import { remove, update } from "../../services/config";
import { path } from "../../services/routes";
import { alertAtom } from "../../stores/alert";
import Button from "../actions/Button";
import Text from "../Typography/Text";

export default function ProjectModal({ setIsOpen }) {
	const router = useRouter();
	const { id } = router.query;
	const { data: session } = useSession();
	const jwt = session?.jwt;
	const { project, isLoading, mutate } = useCurrentProject(id);
	const { user, isUserLoading, mutateUser } = useCurrentUser(jwt);
	const [active, setActive] = useState("Account");

	if (isLoading && isUserLoading) return <p> Loading ... </p>;

	return (
		<div className='p-5 min-h-[300px] flex'>
			<ProjectModalSidebar
				project={project}
				user={user}
				active={active}
				setActive={setActive}
			/>
			<ProjectModalContent
				mutateUser={mutateUser}
				mutate={mutate}
				active={active}
				project={project}
				user={user}
				setIsOpen={setIsOpen}
			/>
		</div>
	);
}

export function ProjectModalContent({
	active,
	project,
	user,
	mutateUser,
	mutate,
	setIsOpen,
}) {
	const router = useRouter();
	const setAlert = useSetAtom(alertAtom);

	async function onSubmit(e) {
		e.preventDefault();
		const body = {
			email: e.target.email.value,
			username: e.target.username.value,
		};
		const { success } = await update(path("UPDATE_user", user.id), body);
		if (success) {
			setAlert({
				content: "Account succesfully updated 🎉",
				active: true,
				success: true,
			});
			return mutateUser();
		} else {
			setAlert({
				content: "An error occured, please try again",
				active: true,
			});
		}
	}

	async function onSubmitProject(e) {
		e.preventDefault();
		const body = {
			data: {
				name: e.target.name.value,
			},
		};
		const { success } = await update(
			path("UPDATE_project", project.data.id),
			body
		);
		if (success) {
			setAlert({
				content: "Project succesfully updated 🎉",
				active: true,
				success: true,
			});
			return mutate(), mutateUser();
		} else {
			setAlert({
				content: "An error occured, please try again",
				active: true,
			});
		}
	}

	async function deleteProject() {
		setIsOpen(false);
		router.push("/dashboard");
		await remove(path("DELETE_project", project.data.id), mutateUser);
		setAlert({
			content: "Project succesfully destroy 🎉",
			active: true,
			success: true,
		});
	}

	if (active === "Account")
		return (
			<div className='w-full mx-8 pb-6 flex flex-col justify-between'>
				<form
					key={`default:${user.email}`}
					id='editprofile'
					className='flex flex-col gap-5'
					onSubmit={(e) => onSubmit(e)}>
					<div>
						<label className='text-14 font-regular text-grey-text-active '>
							{" "}
							Change your email{" "}
						</label>
						<input
							autoFocus
							defaultValue={user.email}
							placeholder='Change your email'
							name='email'
							className={`h-[35px] mt-1 transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-800 w-full pl-3  placeholder:text-grey-text-placeholder placeholder:text-12 placeholder:font-regular`}
						/>
					</div>
					<div>
						<label className='text-14 font-regular text-grey-text-active '>
							{" "}
							Change your username{" "}
						</label>
						<input
							defaultValue={user.username}
							placeholder='Change your email'
							name='username'
							className={`h-[35px] mt-1 transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-800 w-full pl-3  placeholder:text-grey-text-placeholder placeholder:text-12 placeholder:font-regular`}
						/>
					</div>
				</form>

				<Button form='editprofile' type='submit'>
					Save your changes
				</Button>
			</div>
		);
	if (active === "Project")
		return (
			<div className='w-full mx-8 pb-6 flex flex-col gap-8'>
				<form
					key={`default:${project?.data?.attributes.name}`}
					id='editproject'
					className='flex flex-col gap-5'
					onSubmit={(e) => onSubmitProject(e)}>
					<div>
						<label className='text-14 font-regular text-grey-text-active '>
							{" "}
							Edit your project&lsquo;s name{" "}
						</label>
						<input
							autoFocus
							defaultValue={project?.data?.attributes.name}
							placeholder='Change your project&lsquo;s name'
							name='name'
							className={`h-[35px] mt-1 transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-800 w-full pl-3  placeholder:text-grey-text-placeholder placeholder:text-12 placeholder:font-regular`}
						/>
					</div>
				</form>
				<div className='flex flex-col gap-4'>
					<Button form='editproject' type='submit'>
						Save your changes
					</Button>
					<Button attent='warning' onclick={deleteProject}>
						Delete your project
					</Button>
				</div>
			</div>
		);
	if (active === "Collaborator") return <div> Collaborator </div>;
}

export function ProjectModalSidebar({ project, user, active, setActive }) {
	return (
		<div className='p-2 pr-4 border-r border-stroke-blue max-w-[260px] min-w-[180px] min-h-[240px] h-full'>
			<div className='flex flex-col gap-2'>
				<Text size={"12"} color='placeholder'>
					{" "}
					{user?.username.toUpperCase()}{" "}
				</Text>
				<SideBarItem active={active} setActive={setActive} label={"Account"} />
			</div>
			<div className='flex flex-col gap-2 mt-8'>
				<Text size={"12"} color='placeholder'>
					{" "}
					{project?.data?.attributes.name.toUpperCase()}{" "}
				</Text>
				<SideBarItem active={active} setActive={setActive} label={"Project"} />
				<SideBarItem
					active={active}
					setActive={setActive}
					label={"Collaborator"}
				/>
			</div>
		</div>
	);
}

export function SideBarItem({ label, active, setActive }) {
	return (
		<div
			onClick={() => setActive(label)}
			className={`cursor-pointer ${
				active === label
					? "bg-blue-500 border border-stroke-blue"
					: "bg-transparent hover:bg-blue-900 border border-transparent"
			} group max-h-[30px] min-h-[30px] flex items-center justify-between  bg-transparent group  py-0.5 px-2 rounded-md`}>
			<div className='flex items-center gap-2 w-full'>
				<p
					className={`${
						active === label
							? "text-grey-text-active"
							: "text-grey-text-inactive"
					} font-regular text-14 w-full group-hover:text-grey-text-active `}>
					{label}
				</p>
			</div>
		</div>
	);
}
