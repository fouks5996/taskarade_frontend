import { AlertTypes } from "next/app";
import { useEffect } from "react";

function Alert({ alert, setAlert, duration }: AlertProps) {
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
			style={{ opacity: alert.active ? "1" : "0" }}
			className={`${
				alert.active ? "opacity-100 translate-y-4" : "opacity-0 -z-[99999]"
			} transition-all duration-500  ${
				alert.success ? "bg-blue-400 " : "bg-red"
			} top-0 w-fit absolute z-[9999999999999999999999999999999999] text-14 font-sb text-grey-text-active text-center py-2.5 px-4 rounded-md left-[50%] -translate-x-[50%]`}>
			{alert.content}
		</p>
	);
}

Alert.defaultProps = {
	alert: {},
	setAlert: () => {},
	color: "bg-red",
	duration: 2000,
};

interface AlertProps {
	alert: AlertTypes;
	setAlert: Function;
	color: string;
	duration: number;
}

export default Alert;
