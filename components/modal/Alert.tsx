import { AlertTypes } from "next/app";
import { useEffect } from "react";

function Alert({ alert, setAlert, color, duration }: AlertProps) {
	useEffect(() => {
		if (alert.active === true) {
			setTimeout(() => {
				setAlert({
					...alert,
					active: false,
				});
			}, duration);
		}
	}, [alert, duration, setAlert]);

	return (
		<p
			className={`${
				alert.active ? "opacity-100 translate-y-4" : "opacity-0 -z-[99999]"
			} transition-all duration-500 ${
				color ? color : "bg-red"
			} top-0 w-fit absolute bg-red  z-[99999999999999999999] text-14 font-bold text-grey-text-active text-center py-2 px-3 font-normal rounded-md left-[50%] -translate-x-[50%]`}>
			{alert.content}
		</p>
	);
}

Alert.defaultProps = {
	alert: {},
	setAlert: () => {},
	color: "",
	duration: 2000,
};

interface AlertProps {
	alert: AlertTypes;
	setAlert: Function;
	color: string;
	duration: number;
}

export default Alert;
