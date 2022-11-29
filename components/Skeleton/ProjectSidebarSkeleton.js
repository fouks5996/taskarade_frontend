import Image from "next/image";
import React from "react";
import logo from "../../assets/Logo.png";
import { Skeleton } from "@mui/material";

export default function ProjectSidebarSkeleton() {
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
				<Skeleton
					animation='wave'
					variant='circular'
					width={47}
					height={47}
					sx={{ bgcolor: "#252525" }}
				/>
				<Skeleton
					animation='wave'
					variant='circular'
					width={47}
					height={47}
					sx={{ bgcolor: "#252525" }}
				/>
				<Skeleton
					animation='wave'
					variant='circular'
					width={47}
					height={47}
					sx={{ bgcolor: "#252525" }}
				/>
			</div>
		</div>
	);
}
