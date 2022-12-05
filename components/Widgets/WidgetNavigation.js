import Search from "../Search/Search";
import Text from "../Typography/Text";
import IconWrapper from "../Icons/IconWrapper";
import { BsPlus } from "react-icons/bs";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useWidgets } from "../../services/api/widget";
import { getIcon } from "../Icons/GetIcon";
import { post } from "../../services/config";
import { path } from "../../services/routes";
import { useRouter } from "next/router";
import { getUsers, useUsers } from "../../services/api/user";
import AvatarGroup from "../Avatar/AvatarGroup";
import Button from "../actions/Button";
import { useOnClickOutside } from "usehooks-ts";

export default function WidgetNavigation({
	label,
	collaborator = false,
	mutate,
	widgetOwner,
	setItemFilter,
}) {
	const [active, setActive] = useState(false);

	const { data } = useSession();
	const jwt = data?.jwt;
	const { widgets } = useWidgets(jwt);

	function searchItem(data, Fitem) {
		setItemFilter({
			value: data,
			item: Fitem,
		});
	}

	return (
		<div className='relative flex flex-col items-start gap-3 border-b border-stroke-blue py-2 my-3'>
			<div className='flex items-center justify-between w-full'>
				<Text color='placeholder' regular size='12'>
					{label.toUpperCase()}
					{"S"}
				</Text>
				{parseInt(widgetOwner) === parseInt(data.id) && (
					<IconWrapper onclick={() => setActive((active) => !active)}>
						<BsPlus />{" "}
					</IconWrapper>
				)}
			</div>
			<Search label={label} onchange={searchItem} />
			{active && !collaborator && (
				<Wrapper setActive={setActive}>
					<GetWidgets
						widgets={widgets}
						jwt={jwt}
						mutate={mutate}
						setActive={setActive}
					/>
				</Wrapper>
			)}
			{active && collaborator && (
				<Wrapper setActive={setActive}>
					{" "}
					<GetCollaborators
						setActive={setActive}
						mutate={mutate}
						collaborator={collaborator}
						session={data}
					/>
				</Wrapper>
			)}
		</div>
	);
}

export function Wrapper({ children, setActive }) {
	const ref = useRef(null);

	const handleClickOutside = () => {
		setActive(false);
	};
	useOnClickOutside(ref, handleClickOutside);

	return (
		<div
			ref={ref}
			className='absolute border border-stroke-blue z-10 flex flex-col rounded-md bg-blue-600 px-2 py-2 top-10 left-[85%] min-w-[160px]'>
			{children}
		</div>
	);
}

export function GetCollaborators({ session, collaborator, mutate, setActive }) {
	const [collaborators, setCollaborators] = useState([]);
	const router = useRouter();
	const { id } = router.query;

	function getCurrentCollab() {
		const array = [];
		collaborator?.data?.map((collab) => {
			array.push(collab.attributes.collaborator.data.id);
		});

		return array;
	}

	async function searchCollab(value) {
		const res = await getUsers(session.jwt, value.toLowerCase());
		if (value.length === 0) {
			setCollaborators([]);
		} else {
			setCollaborators(res.users);
		}
	}

	async function addCollaboration(userID) {
		const body = { data: { project: id, collaborator: userID } };
		const { success, error } = await post(
			path("CREATE_collaboration"),
			body,
			session.jwt
		);
		if (success) {
			mutate();
			setActive(false);
		} else {
			console.log("erreur", error);
		}
	}

	return (
		<div className='flex flex-col p-1 min-w-[350px] max-h-[400px] overflow-y-scroll'>
			<div className='h-full w-full bg-blue-500 mb-3 rounded-md py-2.5 px-3 text-grey-text-inactive text-14'>
				{" "}
				Collaborators must have an account to be added.{" "}
			</div>
			<Search onchange={searchCollab} label={"a collaborator to add"} />
			<div
				className={`flex flex-col gap-3 ${
					collaborators.length > 0 ? "mt-4" : "mt-0"
				}`}>
				{collaborators
					.filter((user) => parseInt(user.id) !== parseInt(session.id))
					.filter((user) => !getCurrentCollab().includes(parseInt(user.id)))
					.map((collaborator) => (
						<div
							key={collaborator.id}
							className={"flex justify-between items-center gap-5"}>
							<AvatarGroup
								collaborator
								user={collaborator}
								avatarUrl={collaborator.avatar?.url}
							/>
							<Button
								onclick={() => addCollaboration(collaborator.id)}
								width={"fit"}
								principal>
								{" "}
								Add{" "}
							</Button>
						</div>
					))}
			</div>
		</div>
	);
}

export function GetWidgets({ widgets, jwt, mutate, setActive }) {
	const router = useRouter();
	const { id } = router.query;

	async function createWidget(widget) {
		const body = {
			data: {
				widget: widget.id,
				project: id,
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
		<div>
			{widgets.data.map((widget) => (
				<div
					onClick={() => createWidget(widget)}
					className='flex items-center gap-1 text-18 text-grey-text-inactive font-regular hover:bg-blue-900 cursor-pointer rounded-md py-2 px-3'
					key={widget.id}>
					{getIcon(widget.id)}
					<Text regular color='inactive' size='13'>
						{" "}
						{widget.attributes.name}{" "}
					</Text>
				</div>
			))}{" "}
		</div>
	);
}
