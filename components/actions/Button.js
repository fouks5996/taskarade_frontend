import { useState } from "react";
// import Tooltip from "../Modal./Tooltip";

function Button({
	children,
	width,
	principal,
	showText,
	icon,
	submit,
	tooltipLabel,
	onclick,
	disabled,
	color,
	form,
}) {
	const [showTooltip, setShowTooltip] = useState(false);

	const inputWidth = () => {
		if (width === "fit") return "w-fit";
		if (width === false || width === undefined) return "w-full";
	};

	const ColorButton = () => {
		if (color === "red") return "bg-red";
		if (color === "blue") return "bg-blue-400 hover:bg-blue-700";
	};

	return (
		<>
			{principal ? (
				<button
					form={form}
					type={submit && "submit"}
					onClick={() => !disabled && onclick()}
					className={` ${ColorButton()}
           z-50  cursor-pointer rounded-md  flex items-center justify-center gap-1 ${
							icon ? "p-2 pr-1" : "px-4 py-2"
						}   text-grey-text-active text-14 font-medium ${inputWidth()}`}>
					{children}
					{icon && <span className='z-10 text-24 font-bold'> {icon} </span>}
				</button>
			) : (
				<div
					onMouseOver={() => tooltipLabel && setShowTooltip(true)}
					onMouseOut={() => tooltipLabel && setShowTooltip(false)}
					className='relative w-fit'>
					<button
						onClick={() => !disabled && onclick()}
						className={` flex hover:bg-blue_dark items-center gap-2 rounded-lg bg-blue_hover text-xs text-grey_light font-normal py-2 px-2 w-fit`}>
						{showText && children}
						<span className='z-10'> {icon} </span>
					</button>
					{/*{<Tooltip tooltipLabel={tooltipLabel} showToolTip={showTooltip} />}*/}
				</div>
			)}
		</>
	);
}

Button.defaultProps = {
	showText: true,
	onclick: () => {},
	disabled: false,
	icon: false,
	color: "blue",
	form: "",
};

export default Button;
