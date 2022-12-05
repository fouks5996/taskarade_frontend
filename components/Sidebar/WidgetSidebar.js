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
import WidgetSidebarSkeleton from "../Skeleton/WidgetSidebarSkeleton";
import { MdOutlineSettings } from "react-icons/md";
import ModalTemplate from "../modal/ModalTemplate";
import ProjectModal from "../modal/ProjectModal";

export default function WidgetSidebar() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useSession();
	const jwt = data?.jwt;
	const [getId, setGetId] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [itemFilter, setItemFilter] = useState({
		value: null,
		item: null,
	});

	const { project, isLoading, mutate } = useCurrentProject(jwt, id);
	if (isLoading) return <WidgetSidebarSkeleton />;

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className='w-[260px] max-w-[260px] flex justify-center items-center p-5 absolute top-0 left-[0px] h-screen bg-blue-700'>
			<div className='w-full h-full'>
				<div className='flex items-center justify-between gap-3 '>
					<div className='flex flex-col'>
						<Heading size='20'> {project.data?.attributes.name} </Heading>
						<Text regular size='13' color='placeholder'>
							Owner :{" "}
							{project.data?.attributes.creator.data.attributes.username}{" "}
						</Text>
					</div>
					<span
						onClick={() => setIsOpen(true)}
						className='text-grey-text-inactive p-2 rounded-full cursor-pointer hover:bg-status-in_progress_text'>
						<MdOutlineSettings />
					</span>
				</div>
				<div className='flex flex-col gap-8 mt-5'>
					<div>
						<WidgetNavigation
							widgetOwner={project.data?.attributes.creator.data.id}
							label='widget'
							mutate={mutate}
							project_id={id}
							setItemFilter={setItemFilter}
						/>
						<div className='flex flex-col gap-1.5'>
							{project.data?.attributes.project_widgets.data
								.filter((widget) =>
									itemFilter.value !== "" && itemFilter.item === "widget"
										? widget.attributes.name
												.toLowerCase()
												.match(itemFilter.value.toLowerCase())
										: widget
								)
								.map((widget) => (
									<WidgetItem
										key={widget.id}
										widget={widget}
										widgets={project.data?.attributes.project_widgets}
										getId={getId}
										setGetId={setGetId}
										mutate={mutate}
									/>
								))}
						</div>
					</div>

					<div>
						<WidgetNavigation
							widgetOwner={project.data?.attributes.creator.data.id}
							label='collaborator'
							collaborator={project.data?.attributes.collaborations}
							mutate={mutate}
							setItemFilter={setItemFilter}
						/>
						<div className='flex flex-col gap-2 mt-6'>
							{project.data?.attributes.collaborations.data
								.filter((collaborator) =>
									itemFilter.value !== "" && itemFilter.item === "collaborator"
										? collaborator.attributes.collaborator.data.attributes.username
												.toLowerCase()
												.match(itemFilter.value.toLowerCase())
										: collaborator
								)
								.map((collaborator) => (
									<AvatarGroup
										key={collaborator.id}
										collaborator
										user={collaborator.attributes.collaborator.data.attributes}
										avatarUrl={
											collaborator.attributes.collaborator.data.attributes
												.avatar.data?.attributes.url
										}
									/>
								))}
						</div>
					</div>
				</div>
			</div>

			<ModalTemplate IsOpen={modalIsOpen} onRequestClose={closeModal}>
				<ProjectModal setIsOpen={setIsOpen} project={project.data} />
			</ModalTemplate>
		</div>
	);
}

WidgetSidebar.auth = true;
