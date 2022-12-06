import React from "react";

export interface WidgetWrapperProps{
	children: React.ReactNode
}

export default function WidgetWrapper({ children }: WidgetWrapperProps) {
	return (
		<div className='text-white px-8 py-6 h-full w-full overflow-x-scroll'>
			{" "}
			{children}
		</div>
	);
}
