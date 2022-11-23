import React from "react";

export default function IconWrapper({ children, onclick }) {
	return (
		<div
			onClick={onclick}
			className='p-1 cursor-pointer rounded-md hover:bg-blue-600 text-24 text-grey-text-inactive'>
			{children}
		</div>
	);
}
