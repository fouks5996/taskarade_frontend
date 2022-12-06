import React, { useEffect, useState } from "react";

interface TicketsHeaderItem {
	children: React.ReactNode;
}
interface TicketsTableItem {
	children: React.ReactNode;
	time?: boolean;
}

interface TicketPercentage {
	estimated: string;
	realized: string;
}

export function TicketsHeaderItem({ children }: TicketsHeaderItem) {
	return <th className='font-sb  w-fit text-14 text-center'>{children}</th>;
}

export function TicketsTableItem({ children, time }: TicketsTableItem) {
	return (
		<td
			className={`py-3  ${
				time ? "max-w-[130px] min-w-[130px] w-[130px]" : "max-w-[70px]"
			}  font-regular text-13 text-center align-middle	`}>
			{children}
		</td>
	);
}

export function TicketStatus({ status, fit = false }) {
	return (
		<div
			className={`flex items-center ${
				fit ? "justify-start w-fit" : "justify-center w-full"
			}  `}>
			<p
				style={{
					color: status.text_color,
					backgroundColor: status.bg_color,
				}}
				className={`py-1 px-3 text-13 self-center rounded-md`}>
				{status.label}
			</p>
		</div>
	);
}

export function TicketPriority({ priority, fit = false, big = false }) {
	return (
		<div
			className={`flex items-center ${
				fit ? "justify-start w-fit" : "justify-center w-full"
			}  `}>
			<div className='flex items-center gap-1'>
				<div
					style={{
						backgroundColor: priority.first_color,
					}}
					className={`${big ? "w-2.5 h-2.5" : "w-2 h-2"}  rounded-full`}></div>
				<div
					style={{
						backgroundColor: priority.second_color,
					}}
					className={`${big ? "w-2.5 h-2.5" : "w-2 h-2"}  rounded-full`}></div>
				<div
					style={{
						backgroundColor: priority.third_color,
					}}
					className={`${big ? "w-2.5 h-2.5" : "w-2 h-2"}  rounded-full`}></div>
			</div>
		</div>
	);
}

export function TicketPercentage({ estimated, realized }: TicketPercentage) {
	const [newEstimated, setNewEstimated] = useState<number | null>(null);
	const [newRealized, setNewRealized] = useState<number | null>(null);
	const [percentage, setPercentage] = useState<string | null>(null);

	useEffect(() => {
		function getPercentage() {
			if (estimated.includes("d")) {
				setNewEstimated(parseInt(estimated.replace("d", "")) * 60 * 7);
			}
			if (estimated.includes("h")) {
				setNewEstimated(parseInt(estimated.replace("h", "")) * 60);
			}
			if (estimated.includes("min")) {
				setNewEstimated(parseInt(estimated.replace("min", "")));
			}
			if (realized.includes("d")) {
				setNewRealized(parseInt(realized.replace("d", "")) * 60 * 7);
			}
			if (realized.includes("h")) {
				setNewRealized(parseInt(realized.replace("h", "")) * 60);
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
