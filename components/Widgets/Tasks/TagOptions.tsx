import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface TagOptions {
	setOptionsModal: Function;
	tag: {
		id: number;
	};
}

export default function TagOptions({ setOptionsModal, tag }: TagOptions) {
	return (
		<span
			onClick={() => setOptionsModal(tag.id)}
			className='text-grey-text-inactive'>
			<HiOutlineDotsHorizontal />
		</span>
	);
}
