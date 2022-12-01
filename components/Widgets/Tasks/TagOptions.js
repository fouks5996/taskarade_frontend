import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function TagOptions({ setOptionsModal, optionsModal, tag }) {
	return (
		<span
			onClick={() => setOptionsModal(tag.id)}
			className='text-grey-text-inactive'>
			<HiOutlineDotsHorizontal />
		</span>
	);
}
