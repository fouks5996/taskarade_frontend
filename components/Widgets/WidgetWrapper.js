import React from "react";

export default function WidgetWrapper({ children }) {
	return (
		<div className='text-white px-8 py-6 h-full w-full overflow-x-scroll'>
			{" "}
			{children}
		</div>
	);
}
