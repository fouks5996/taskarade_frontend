import Image from "next/image";
import React from "react";
import { getRoot } from "../../services/config";
import Text from "../Typography/Text";

export default function Avatar({ user, avatarUrl }) {
	if (avatarUrl) {
		return (
			<div className='h-10 w-10 border-2 border-white rounded-full relative'>
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
			<div className='flex justify-center items-center h-10 w-10 border-2 border-white bg-green rounded-full relative'>
				<Text bold> {user?.username.charAt(0).toUpperCase()} </Text>
			</div>
		);
	}
}
