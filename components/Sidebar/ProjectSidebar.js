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
import string_to_slug from "../functions/Slugify";
import Loader from "../Loader/Loader";
import Alert from "../modal/Alert";

export default function ProjectSidebar() {
	const router = useRouter();
	const { data } = useSession();
	const jwt = data?.jwt;
	const { user, isUserLoading, mutateUser } = useCurrentUser(jwt);
	if (isUserLoading) return <ProjectSidebarSkeleton />;

	return (
		<div className='w-[70px] text-grey-text-active flex flex-col items-center pt-6 gap-3 h-screen border-r border-stroke-blue'>
			<span className='cursor-pointer' onClick={() => router.push("/")}>
				{" "}
				<Image
					alt='logo'
					src={logo}
					layout='fixed'
					width={38}
					height={29}
				/>{" "}
			</span>

			<div className='mt-1 h-[1px] w-full bg-stroke-blue'> </div>
			<div className='flex flex-col gap-2'>
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
						name={collab.project?.name}
						id={collab.project?.id}
						project_widget={collab.project?.project_widgets}
					/>
				))}
			</div>
			<CreateProject projectCreator={data.id} mutate={mutateUser} />
		</div>
	);
}

export function CreateProject({ projectCreator, mutate }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function createProject() {
		setIsLoading(true);
		const body = { data: { name: "New Project", creator: projectCreator } };
		const { success, error } = await post(path("CREATE_project"), body);
		if (success) {
			mutate();
			const Widgetbody = {
				data: {
					widget: 1,
					project: success.data.id,
					name: "Prise de note",
					widget_creator: projectCreator,
				},
			};
			const { success: res } = await post(path("CREATE_widget"), Widgetbody);
			if (res) {
				mutate();
				setIsLoading(false);
				router.push(
					`/project/${success.data?.id}/widget/${
						res.data?.id
					}?q=${string_to_slug(res.data?.attributes.name)}`
				);
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
			className={`flex cursor-pointer text-24 text-grey-text-active hover:bg-blue-400   justify-center items-center h-10 w-10  rounded-full relative`}>
			{isLoading ? <Loader type='spin' height={17} width={17} /> : <BsPlus />}{" "}
		</div>
	);
}

export function SidebarElement({ name, id, project_widget }) {
	const router = useRouter();
	const [active, setActive] = useState(false);
	const [alert, setAlert] = useState({
		active: false,
		content: "",
	});

	useEffect(() => {
		if (router.asPath.includes(`/project/${id}/widget`)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [router, setActive, id]);

	return (
		<>
			<Link
				href={`/project/${id}/widget/${project_widget[0]?.id}`}
				as={`/project/${id}/widget/${project_widget[0]?.id}?q=${string_to_slug(
					project_widget[0]?.name
				)}`}>
				<div
					className={`flex cursor-pointer hover:scale-105 ${
						active ? "border-2 border-white" : "border-none"
					} justify-center items-center h-10 w-10 bg-blue-400  rounded-full relative`}>
					<Text size='14' color='inactive' bold>
						{name?.charAt(0).toUpperCase()}
					</Text>
				</div>
			</Link>
			<Alert
				alert={alert}
				setAlert={setAlert}
				color='bg-blue-600'
				duration={"800"}
			/>
		</>
	);
}

ProjectSidebar.auth = true;
