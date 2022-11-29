import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../services/api/user";
import Text from "../Typography/Text";
import logo from "../../assets/Logo.png";
import { useRouter } from "next/router";
import Link from "next/link";
import ProjectSidebarSkeleton from "../Skeleton/ProjectSidebarSkeleton";
import { BsPlus } from "react-icons/bs";
import { post } from "../../services/config";
import { path } from "../../services/routes";
import getMinId from "../functions/GetMinId";

export default function ProjectSidebar() {
	const router = useRouter();
	const { data } = useSession();
	const jwt = data?.jwt;
	const { user, isLoading, mutate } = useCurrentUser(jwt);
	if (isLoading) return <ProjectSidebarSkeleton />;

	return (
		<div className='w-[80px] text-grey-text-active flex px-4 flex-col items-center pt-6 gap-4 h-screen border-r border-stroke-blue'>
			<span className='cursor-pointer' onClick={() => router.push("/")}>
				{" "}
				<Image
					alt='logo'
					src={logo}
					layout='fixed'
					width={43}
					height={33}
				/>{" "}
			</span>

			<div className='mt-1 h-[1px] w-full bg-stroke-blue'> </div>
			<div className='flex flex-col gap-3'>
				{user.project?.map((proj) => (
					<SidebarElement
						key={proj.id}
						name={proj.name}
						id={proj.id}
						project_widget={proj.project_widgets}
					/>
				))}
				<div className='min-h-[2px] my-1 mb-2 max-h-[2px] w-full bg-stroke-blue'>
					{" "}
				</div>
				{user.collaborations?.map((collab) => (
					<SidebarElement
						key={collab.id}
						name={collab.project.name}
						id={collab.project.id}
						project_widget={collab.project.project_widgets}
					/>
				))}
			</div>
			<CreateProject jwt={jwt} projectCreator={data.id} mutate={mutate} />
		</div>
	);
}

export function CreateProject({ jwt, projectCreator, mutate }) {
	async function createProject() {
		const body = { data: { name: "New Project", creator: projectCreator } };
		const { success, error } = await post(path("CREATE_project"), body, jwt);
		if (success) {
			mutate();
			const Widgetbody = {
				data: {
					widget: 1,
					project: success.data.id,
					name: "Prise de note",
				},
			};
			const { success: res } = await post(
				path("CREATE_widget"),
				Widgetbody,
				jwt
			);
			if (res) {
				mutate();
			} else {
				console.log("error");
			}
		} else {
			console.log(error);
		}
	}

	return (
		<div
			onClick={() => createProject()}
			className={`flex cursor-pointer text-24 text-grey-text-active hover:bg-blue-400   justify-center items-center h-12 w-12  rounded-full relative`}>
			<BsPlus />{" "}
		</div>
	);
}

export function SidebarElement({ name, id, project_widget }) {
	const router = useRouter();
	const [active, setActive] = useState(false);
	const minId = getMinId(project_widget);
	useEffect(() => {
		if (router.asPath.includes(`/project/${id}/widget`)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [router, setActive, id]);

	return (
		<Link
			href={`/project/${id}/widget/${minId}`}
			as={`/project/${id}/widget/${minId}`}>
			<div
				className={`flex cursor-pointer hover:scale-105 ${
					active ? "border-2 border-white" : "border-none"
				} justify-center items-center h-12 w-12 bg-blue-400  rounded-full relative`}>
				<Text color='inactive' bold>
					{name?.charAt(0).toUpperCase()}
				</Text>
			</div>
		</Link>
	);
}

ProjectSidebar.auth = true;
