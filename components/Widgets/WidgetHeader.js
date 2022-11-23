import React from "react";
import Button from "../actions/Button";
import Heading from "../Typography/Heading";

export default function WidgetHeader({ name, type, onclick, icon }) {
	return (
		<div className='flex items-center justify-between w-full '>
			<Heading size={"28"}> {name} </Heading>
			<Button principal icon={icon} width='fit' onclick={() => onclick()}>
				{" "}
				Create a {type}{" "}
			</Button>
		</div>
	);
}
