import { useSession } from "next-auth/react";
import { useRef } from "react";
import { update } from "../../services/config";
import { path } from "../../services/routes";
import AvatarGroup from "../Avatar/AvatarGroup";
import Text from "../Typography/Text";
import { useOnClickOutside } from "usehooks-ts";
import { useRouter } from "next/router";

export function Notifications({ notifications, mutate, setShowNotification }) {
	const ref = useRef(null);

	const handleClickOutside = () => {
		setShowNotification(false);
	};
	useOnClickOutside(ref, handleClickOutside);

	function MarkAllAsRead() {
		return notifications.map(async (notification) => {
			const body = { data: { seen: true } };
			const { success } = await update(
				path("UPDATE_notification", notification.id),
				body
			);
			if (success) {
				mutate();
			} else {
				console.log("error");
			}
		});
	}

	return (
		<div
			ref={ref}
			className='bg-blue-600 rounded-md border border-stroke-blue py-4 px-4 min-w-[400px] w-fit max-h-[500px] overflow-y-scroll'>
			<div className='flex justify-between items-center'>
				<Text sb size={"18"}>
					{" "}
					Notifications{" "}
				</Text>
				<Text
					pointer
					hoverUnderline
					onclick={() => MarkAllAsRead()}
					color={"blue"}
					size={"12"}>
					{" "}
					Mark all as read{" "}
				</Text>
			</div>
			<div className='flex flex-col divide-y divide-stroke-blue gap-2 mt-3 pb-2'>
				{notifications
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map((notification) => (
						<Notification
							setShowNotification={setShowNotification}
							key={notification.id}
							notification={notification}
						/>
					))}
			</div>
		</div>
	);
}

export function Notification({ notification, setShowNotification }) {
	const router = useRouter();
	return (
		<div className='py-3 pt-4 px-1 relative'>
			<div className='flex flex-col relative'>
				<div className='flex items-center  gap-1'>
					<AvatarGroup
						minus
						user={notification.sender}
						avatarUrl={notification.sender.avatar?.url}
					/>
					<span className='-300 w-full'>
						<Text size={"14"}> {notification.body.substr(0, 22) + "..."} </Text>
					</span>
				</div>
				{!notification.seen && <NotificationDot inside />}
			</div>

			<div>
				{notification.comment && (
					<div className='ml-8 my-1 border  border-stroke-blue py-2 px-2 rounded-md text-12 font-regular text-grey-text-inactive'>
						{notification.comment.substr(0, 40) + "..."}
					</div>
				)}
			</div>

			<div className='flex items-center justify-between ml-8 pt-1 '>
				<Text size={"13"} color={"inactive"}>
					In project{" "}
					<span
						onClick={() => {
							router.push(notification.linkTo), setShowNotification(false);
						}}
						className='underline cursor-pointer'>
						{" "}
						{notification.project?.name}{" "}
					</span>{" "}
				</Text>
				<Text size={"12"} color={"placeholder"}>
					{new Date(notification.createdAt).toLocaleDateString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
			</div>
		</div>
	);
}

export function NotificationDot({ inside = false }) {
	return (
		<div
			className={`absolute ${
				inside ? "top-2 right-1" : "-top-1 -right-1"
			}  rounded-full h-2 w-2 bg-blue-300`}></div>
	);
}
