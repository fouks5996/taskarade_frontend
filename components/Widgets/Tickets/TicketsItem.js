import React, { useEffect, useState } from "react";

export function TicketsHeaderItem({ children }) {
	return <th className='font-sb w-fit text-14 text-center'>{children}</th>;
}

export function TicketsTableItem({ children }) {
	return (
		<td className='py-3 w-fit   font-regular text-13 text-center align-middle	'>
			{children}
		</td>
	);
}

export function TicketStatus({ status }) {
	return (
		<div className='flex items-center justify-center w-full'>
			<p
				style={{
					color: status.text_color,
					backgroundColor: status.bg_color,
				}}
				className={`py-1 px-3 self-center rounded-md`}>
				{status.label}
			</p>
		</div>
	);
}

export function TicketPriority({ priority }) {
	return (
		<div className='flex items-center justify-center w-full'>
			<div className='flex items-center gap-1'>
				<div
					style={{
						backgroundColor: priority.first_color,
					}}
					className='w-2 h-2 rounded-full'></div>
				<div
					style={{
						backgroundColor: priority.second_color,
					}}
					className='w-2 h-2 rounded-full '></div>
				<div
					style={{
						backgroundColor: priority.third_color,
					}}
					className='w-2 h-2 rounded-full '></div>
			</div>
		</div>
	);
}

export function TicketPercentage({ estimated, realized }) {
	const [newEstimated, setNewEstimated] = useState();
	const [newRealized, setNewRealized] = useState();

	const [percentage, setPercentage] = useState();

	useEffect(() => {
		function getPercentage() {
			if (estimated.includes("d")) {
				setNewEstimated(parseInt(estimated.replace("h", "")) * 60 * 7);
			}
			if (estimated.includes("h")) {
				setNewEstimated(parseInt(estimated.replace("h", "")) * 60);
			}
			if (estimated.includes("min")) {
				setNewEstimated(parseInt(estimated.replace("h", "")));
			}
			if (realized.includes("d")) {
				setNewRealized(parseInt(realized.replace("min", "")) * 60 * 7);
			}
			if (realized.includes("h")) {
				setNewRealized(parseInt(realized.replace("min", "")) * 60);
			}
			if (realized.includes("min")) {
				setNewRealized(parseInt(realized.replace("min", "")));
			}
			return setPercentage(((newRealized / newEstimated) * 100).toFixed(0));
		}
		getPercentage();
	}, [estimated, newEstimated, newRealized, realized]);

	return (
		<div className='flex items-center justify-center'>
			<div className='relative min-h-[8px] rounded-md min-w-[50px] max-w-[50px] bg-grey-text-inactive'>
				<div
					style={{
						minWidth: percentage + "%",
						maxWidth: percentage + "%",
					}}
					className='h-full absolute z-10 left-0 rounded-md bg-blue-300 '></div>
			</div>
		</div>
	);
}
