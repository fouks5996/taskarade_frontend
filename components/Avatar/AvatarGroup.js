import React from "react";
import Text from "../Typography/Text";
import Avatar from "./Avatar";

export default function AvatarGroup({ user, header, collaborator, avatarUrl }) {
	if (header)
		return (
			<div className='flex items-center gap-3 cursor-pointer'>
				<Avatar user={user} avatarUrl={avatarUrl} />
				<div className='flex flex-col justify-center'>
					<Text medium size='14'>
						{" "}
						{user.username}{" "}
					</Text>
					<Text regular size='12' color='placeholder'>
						{" "}
						{user.email}{" "}
					</Text>
				</div>
			</div>
		);
	else if (collaborator) {
		return (
			<div className='flex items-center gap-3 cursor-pointer'>
				<Avatar user={user} avatarUrl={avatarUrl} />
				<div>
					<Text medium size='14'>
						{" "}
						{user?.username}{" "}
					</Text>
					<Text regular size='12' color='placeholder'>
						{" "}
						{user?.email}{" "}
					</Text>
				</div>
			</div>
		);
	}
}

AvatarGroup.defaultProps = {
	header: false,
	collaborator: false,
};
