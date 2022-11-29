import React from "react";

export default function Tab({ setActive, active, tabs }) {
	return (
		<div className='border-b flex items-center gap-5 border-stroke-blue w-full'>
			{tabs.map((tab, i) => (
				<p
					key={i}
					className={
						active === tab
							? "border-b-2 pb-1 border-text-grey-active text-14 cursor-pointer"
							: "text-grey-text-placeholder pb-1 text-14 cursor-pointer"
					}
					onClick={() => setActive(tab)}>
					{tab}
				</p>
			))}
		</div>
	);
}
