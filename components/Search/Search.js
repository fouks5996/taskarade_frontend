import { RiSearchLine } from "react-icons/ri";

export default function Search({ label, onchange }) {
	return (
		<div className='flex  flex-row-reverse items-center justify-end'>
			<input
				onChange={(e) => onchange(e.target.value)}
				className='bg-transparent w-full focus:w-full h-6 focus:h-6 peer pl-2 focus:pl-2 focus:text-regular focus:text-13 focus:text-grey-text-active focus:outline-none placeholder:font-regular placeholder:text-13 placeholder:text-grey-text-placeholder'
				placeholder={`Search ${label} ...`}
				type='text'
			/>
			<p className='text-20  text-grey-text-placeholder peer-focus:text-grey-text-active'>
				<RiSearchLine />
			</p>
		</div>
	);
}
