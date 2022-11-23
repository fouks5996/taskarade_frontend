import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCurrentProject } from "../../services/api/project";
import Loader from "../Loader/Loader";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import AvatarGroup from "../Avatar/AvatarGroup";
import WidgetNavigation from "../Widgets/WidgetNavigation";
import WidgetItem from "../Widgets/WidgetItem";

export default function WidgetSidebar() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const [getId, setGetId] = useState(null);

	const { project, isLoading, mutate } = useCurrentProject(jwt, id);
	if (isLoading)
		return (
			<div className='w-[270px] max-w-[270px] flex justify-center items-center p-4 absolute top-0 left-[0px] h-screen bg-blue-700'>
				<Loader type='spin' height={30} width={30} />
			</div>
		);

	return (
		<div className='w-[270px] max-w-[270px] flex justify-center items-center p-5 absolute top-0 left-[0px] h-screen bg-blue-700'>
			<div className='w-full h-full'>
				<div className='flex items-center gap-3 '>
					{/* 					<SidebarElement name={project.data?.attributes.name} /> */}
					<div className='flex flex-col'>
						<Heading size='20'> {project.data?.attributes.name} </Heading>
						<Text regular size='13' color='placeholder'>
							Owner :{" "}
							{project.data?.attributes.creator.data.attributes.username}{" "}
						</Text>
					</div>
				</div>
				<div className='flex flex-col gap-8 mt-5'>
					<div>
						<WidgetNavigation label='widget' mutate={mutate} project_id={id} />
						<div className='flex flex-col gap-1.5'>
							{project.data?.attributes.project_widgets.data.map((widget) => (
								<WidgetItem
									key={widget.id}
									widget={widget}
									getId={getId}
									setGetId={setGetId}
									mutate={mutate}
								/>
							))}
						</div>
					</div>
					<div>
						<WidgetNavigation label='collaborator' collaborator />
						<div className='flex flex-col gap-4 mt-6'>
							{project.data?.attributes.collaborations.data.map(
								(collaborator) => (
									<AvatarGroup
										key={collaborator.id}
										collaborator
										user={collaborator.attributes.collaborator.data.attributes}
										avatarUrl={
											collaborator.attributes.collaborator.data.attributes
												.avatar.data?.attributes.url
										}
									/>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
