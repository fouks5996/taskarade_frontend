import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../services/api/user";
import Loader from "../Loader/Loader";
import Text from "../Typography/Text";
import logo from "../../assets/Logo.png";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProjectSidebar() {
	const router = useRouter();
	const { data } = useSession();
	const jwt = data?.jwt;
	const { user, isLoading } = useCurrentUser(jwt);
	if (isLoading) return <Loader type='spin' height={20} width={20} />;

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
					<SidebarElement key={proj.id} name={proj.name} id={proj.id} />
				))}
				{user.collaborations?.map((collab) => (
					<SidebarElement
						key={collab.id}
						name={collab.project.name}
						id={collab.project.id}
					/>
				))}
			</div>
		</div>
	);
}

export function SidebarElement({ name, id }) {
	const router = useRouter();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (router.asPath.includes(`/project/${id}`)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [router, setActive, id]);

	return (
		<Link href={`/project/${id}?q=${name.toLowerCase()}`}>
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
