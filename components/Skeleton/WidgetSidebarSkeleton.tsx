import React from "react";
import { Skeleton } from "@mui/material";
import WidgetNavigation from "../Widgets/WidgetNavigation";
import AvatarSkeletton from "./AvatarSkeletton";

export default function WidgetSidebarSkeleton() {
	return (
		<div className='w-[260px] max-w-[260px] flex justify-center items-center p-5 absolute top-0 left-[0px] h-screen bg-blue-700'>
			<div className='w-full h-full'>
				<div className='flex items-center gap-3 '>
					{/* 					<SidebarElement name={project.data?.attributes.name} /> */}
					<div className='flex flex-col gap-1'>
						<Skeleton
							animation='wave'
							variant='rounded'
							width={60}
							height={25}
							sx={{ bgcolor: "#252525" }}
						/>
						<Skeleton
							animation='wave'
							variant='rounded'
							width={165}
							height={19}
							sx={{ bgcolor: "#252525" }}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-8 mt-5'>
					<div>
						<WidgetNavigation label='widget' />
						<div className='flex flex-col gap-2'>
							<Skeleton
								animation='wave'
								variant='rounded'
								width={70}
								height={19}
								sx={{ bgcolor: "#252525" }}
							/>
							<Skeleton
								animation='wave'
								variant='rounded'
								width={120}
								height={20}
								sx={{ bgcolor: "#252525" }}
							/>
						</div>
					</div>
					<div>
						<WidgetNavigation label='collaborator' collaborator />
						<div className='flex flex-col gap-4 mt-6'>
							<AvatarSkeletton />
							<AvatarSkeletton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
