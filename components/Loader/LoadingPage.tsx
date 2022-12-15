import React from "react";
import Text from "../Typography/Text";
import Loader from "./Loader";

export default function LoadingPage() {
	return (
		<div className='flex relative items-center h-screen w-screen justify-center'>
			<div className='flex flex-col items-center justify-center gap-4 bg-blue-600 rounded-md border border-stroke-blue py-4 px-5'>
				<Text size='18'> Your content is loading ... </Text>
				<Loader type='spin' height={30} width={30} />
			</div>
			<svg
				className='absolute -z-10 top-0'
				viewBox='0 0 400 200'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fill='#F1C21B'
					d='M40.2,-27.3C49.8,-19.9,53.9,-3.3,48.5,7.3C43.1,17.9,28.1,22.6,12.6,32.5C-2.8,42.3,-18.9,57.4,-28.3,54.5C-37.8,51.6,-40.8,30.8,-43.8,11.7C-46.8,-7.3,-49.7,-24.7,-42.4,-31.5C-35.1,-38.3,-17.6,-34.6,-1.2,-33.7C15.2,-32.7,30.5,-34.6,40.2,-27.3Z'
				/>
			</svg>
			<svg
				className='absolute -z-10 bottom-0'
				viewBox='0 0 200 200'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fill='#FA4D56'
					d='M60.4,-37C75.6,-29,83.6,-4.1,77.8,16.5C72.1,37,52.7,53.2,33,59C13.3,64.9,-6.8,60.4,-27.9,52.4C-49,44.4,-71,32.8,-78.1,14.3C-85.2,-4.3,-77.3,-29.8,-61.8,-37.8C-46.2,-45.8,-23.1,-36.2,-0.3,-36C22.6,-35.8,45.1,-44.9,60.4,-37Z'
					transform='translate(10 220)'
				/>
			</svg>
			<svg
				className='absolute -z-10 top-0'
				viewBox='0 0 200 200'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fill='#8A3FFC'
					d='M44.5,-44.2C51.8,-26.3,47.9,-8.1,42.2,6.8C36.5,21.7,29.1,33.4,17.2,41.4C5.2,49.4,-11.3,53.6,-19.9,47.2C-28.4,40.8,-29.1,23.8,-30.8,9.1C-32.5,-5.7,-35.4,-18.1,-30.4,-35.5C-25.5,-52.9,-12.7,-75.3,2.9,-77.6C18.6,-79.9,37.1,-62.2,44.5,-44.2Z'
					transform='translate(100 -20)'
				/>
			</svg>
			<svg
				className='absolute -z-10 top-0'
				viewBox='0 0 200 200'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fill='#24A148'
					d='M19.5,-24.2C24.7,-9,28,-0.9,28.3,9.9C28.6,20.8,25.8,34.4,16.1,42.7C6.3,51,-10.6,53.9,-30,49.5C-49.4,45,-71.4,33.2,-70.8,20.5C-70.2,7.9,-47,-5.6,-31.4,-23.1C-15.9,-40.7,-7.9,-62.4,-0.4,-62.1C7.1,-61.7,14.3,-39.4,19.5,-24.2Z'
					transform='translate(230 60)'
				/>
			</svg>
		</div>
	);
}
