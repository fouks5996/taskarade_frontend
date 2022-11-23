import React from "react";
import { RiSearchLine } from "react-icons/ri";
import Text from "../Typography/Text";

export default function Search({ label }) {
	return (
		<div className='flex flex-row-reverse items-center gap-4'>
			<input
				className='bg-transparent peer focus:text-regular focus:text-14 focus:text-grey-text-active focus:outline-none placeholder:font-regular placeholder:text-14 placeholder:text-grey-text-placeholder'
				placeholder={`Search ${label} ...`}
				type='text'
			/>
			<p className='text-20 text-grey-text-placeholder peer-focus:text-grey-text-active'>
				<RiSearchLine />
			</p>
		</div>
	);
}
