import React from "react";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ModalLayoutProps {
	children: React.ReactNode;
	setModal: Function;
}

export default function ModalLayout({ children, setModal }: ModalLayoutProps) {
	const ref = useRef(null);

	const handleClickOutside = () => {
		setModal({ state: false, data: null });
	};
	useOnClickOutside(ref, handleClickOutside);
	return (
		<div
			style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
			className='absolute flex justify-end h-screen w-screen top-0 z-[99999]  left-0'>
			<div
				ref={ref}
				className='h-screen overflow-y-scroll border-l border-stroke-blue w-[65%] max-screen:w-[50%] bg-blue-700'>
				{" "}
				<div className='p-7 pr-28'>{children} </div>
			</div>
		</div>
	);
}
