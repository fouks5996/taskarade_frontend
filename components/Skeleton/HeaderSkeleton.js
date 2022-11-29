import React from "react";
import Search from "../Search/Search";
import AvatarSkeletton from "./AvatarSkeletton";

export default function HeaderSkeleton() {
	return (
		<div
			className={`flex  border-b border-stroke-blue justify-between px-[3%] py-5 items-center w-full`}>
			<Search label='everywhere' />

			<AvatarSkeletton />
		</div>
	);
}
