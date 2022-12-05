import React from "react";
import Button from "../actions/Button";
import { getIcon } from "../Icons/GetIcon";
import Heading from "../Typography/Heading";

export default function WidgetHeader({ name, type, onclick, icon, widgetID }) {
	return (
		<div className='flex items-center justify-between w-full '>
			<Heading size={"20"}>
				{getIcon(widgetID)} {"  " + name}
			</Heading>
			<Button icon={icon} onclick={() => onclick()} width='fit'>
				Create a {type}
			</Button>
		</div>
	);
}
