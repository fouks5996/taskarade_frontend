import React from "react";

interface IconWrapper {
	children: React.ReactNode;
	onclick?: any;
}

export default function IconWrapper({ children, onclick }: IconWrapper) {
	return (
		<div
			onClick={onclick}
			className='p-1 cursor-pointer rounded-md hover:bg-blue-600 text-24 text-grey-text-inactive'>
			{children}
		</div>
	);
}
