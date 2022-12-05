import Image from "next/image";
import React from "react";
import { getRoot } from "../../services/config";
import Text from "../Typography/Text";

export default function Avatar({
	user,
	avatarUrl,
	minus = false,
	collaborator = false,
}) {
	if (avatarUrl) {
		return (
			<div
				className={`${minus && "h-6 w-6"} ${collaborator && "h-8 w-8"} ${
					!minus && !collaborator && "h-8 w-8"
				} border-2 border-white rounded-full relative`}>
				<Image
					src={getRoot().API_URL + avatarUrl}
					alt='Picture of You'
					layout='fill'
					objectFit='cover'
					className='rounded-full'
				/>
			</div>
		);
	} else {
		return (
			<div
				className={`flex justify-center items-center ${minus && "h-6 w-6"} ${
					collaborator && "h-8 w-8"
				} ${
					!minus && !collaborator && "h-8 w-8"
				} border-2 border-white bg-green rounded-full relative`}>
				{minus ? (
					<Text size={"12"} regular>
						{" "}
						{user?.username.charAt(0).toUpperCase()}{" "}
					</Text>
				) : (
					<Text bold> {user?.username.charAt(0).toUpperCase()} </Text>
				)}
			</div>
		);
	}
}
