import React from "react";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

export default function AvatarSkeletton() {
	return (
		<div className='flex items-center gap-3 cursor-pointer'>
			<Skeleton
				animation='wave'
				variant='circular'
				width={32}
				height={32}
				sx={{ bgcolor: "#252525" }}
			/>
			<div className='flex flex-col gap-1 justify-center'>
				<Skeleton
					animation='wave'
					variant='rounded'
					width={130}
					height={19}
					sx={{ bgcolor: "#252525" }}
				/>
				<Skeleton
					animation='wave'
					variant='rounded'
					width={154}
					height={17}
					sx={{ bgcolor: "#252525" }}
				/>
			</div>
		</div>
	);
}
