import { useState } from "react";
import { cva } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/dist/types";
import { type } from "os";

const globalClasses: string[] = [
	"rounded-md",
	"font-medium",
	"flex",
	"items-center",
	"justify-center",
	"gap-1",
	"text-grey-text-active",
];

const button = cva(globalClasses, {
	variants: {
		attent: {
			primary: ["bg-blue-400 ", "hover:bg-blue-600"],
			warning: ["bg-red", "hover:bg-red"],
		},
		size: {
			small: ["text-12", "py-1", "px-2"],
			medium: ["text-14", "py-2", "px-4"],
			iconOnly: ["p-1.5"],
		},
		width: {
			fit: "w-fit",
			full: "w-full",
		},
	},
	defaultVariants: {
		attent: "primary",
		size: "medium",
		width: "full",
	},
});

function Button({
	className,
	attent,
	icon,
	size,
	width,
	children,
	onclick,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			onClick={() => onclick()}
			className={button({ attent, size, className, width })}>
			{children}
			{<span className='z-10 text-24 font-bold'> {icon} </span>}
		</button>
	);
}

Button.defaultProps = {
	onclick: () => {},
	icon: false,
	attent: "",
	width: "",
	className: "",
	children: "",
	form: "",
};

export interface ButtonProps {
	className?: ClassValue;
	attent?: "primary" | "warning";
	icon?: any;
	size?: "small" | "medium" | "iconOnly";
	width?: "fit" | "full";
	children?: React.ReactNode;
	onclick?: Function;
	form?: "myform" | "signin";
	type?: "submit";
}

export default Button;
