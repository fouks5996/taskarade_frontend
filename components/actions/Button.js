import { useState } from "react";
import { cva } from "class-variance-authority";

const globalClasses = [
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
	iconOnly,
	...props
}) {
	return (
		<button
			{...props}
			onClick={() => onclick()}
			className={button({ attent, size, className, width, iconOnly })}>
			{children}
			{icon && <span className='z-10 text-24 font-bold'> {icon} </span>}
		</button>
	);
}

Button.defaultProps = {
	onclick: () => {},
	icon: false,
	attent: "",
	iconOnly: "",
	width: "",
	className: "",
	children: "",
};

export default Button;
