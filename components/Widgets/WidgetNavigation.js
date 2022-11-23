import Search from "../Search/Search";
import Text from "../Typography/Text";
import IconWrapper from "../Icons/IconWrapper";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useWidgets } from "../../services/api/widget";
import Loader from "../Loader/Loader";
import { getIcon } from "../Icons/GetIcon";
import { post } from "../../services/config";
import { path } from "../../services/routes";

export default function WidgetNavigation({
	label,
	collaborator = false,
	mutate,
	project_id,
}) {
	const [active, setActive] = useState(false);
	const { data } = useSession();
	const jwt = data?.jwt;
	const { widgets, isLoading } = useWidgets(jwt);
	if (isLoading) return <Loader type='spin' height={30} width={30} />;

	async function createWidget(widget) {
		const body = {
			data: {
				widget: widget.id,
				project: parseInt(project_id),
				name: widget.attributes.name,
			},
		};
		const { success, error } = await post(path("CREATE_widget"), body, jwt);
		if (success) {
			mutate();
			setActive(false);
		} else {
			console.log(error);
		}
	}

	return (
		<div className='relative flex flex-col items-start gap-3 border-b border-stroke-blue py-2 my-3'>
			<div className='flex items-center justify-between w-full'>
				<Text color='inactive' regular size='14'>
					{label.toUpperCase()}
					{"S"}
				</Text>
				<IconWrapper onclick={() => setActive((active) => !active)}>
					<BsPlus />{" "}
				</IconWrapper>
			</div>
			<Search label={label} />
			{active && !collaborator && (
				<div className='absolute flex flex-col rounded-md bg-blue-600 px-2 py-3 top-10 right-0 min-w-[160px]'>
					{widgets.data.map((widget) => (
						<div
							onClick={() => createWidget(widget)}
							className='flex items-center gap-1 text-18 text-grey-text-inactive font-regular hover:bg-blue-900 cursor-pointer rounded-md py-2 px-2'
							key={widget.id}>
							{getIcon(widget.id)}
							<Text regular color='inactive' size='13'>
								{" "}
								{widget.attributes.name}{" "}
							</Text>
						</div>
					))}
				</div>
			)}
			{active && collaborator && (
				<div className='absolute rounded-md bg-blue-400 p-2 top-10 right-0'>
					<p> collab </p>
				</div>
			)}
		</div>
	);
}
