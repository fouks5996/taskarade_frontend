import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Text from "../Typography/Text";
import { useCurrentUser } from "../../services/api/user";
import Loader from "../Loader/Loader";
import AvatarGroup from "../Avatar/AvatarGroup";
import {
	IoMdNotificationsOutline,
	IoNotificationsOutline,
} from "react-icons/io";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
	const { data: session } = useSession();
	const jwt = session?.jwt;
	const { user, isLoading } = useCurrentUser(jwt);
	const router = useRouter();

	useEffect(() => {
		if (router.asPath !== "/") setState(true);
	}, [router]);
	const [state, setState] = useState(false);

	if (isLoading) return <Loader type='spin' height={20} width={20} />;

	return (
		<div
			className={`flex  border-b border-stroke-blue justify-center px-[3%] py-5 items-center w-full`}>
			<div className={"flex justify-between w-full"}>
				{session ? (
					<div className='flex items-center justify-between w-full'>
						<Search label='everywhere' />
						<div className='flex items-center gap-5'>
							<button
								onClick={() =>
									signOut({
										callbackUrl: "http://localhost:3000/auth/sign-in",
									})
								}>
								Sign out
							</button>
							<Text color='inactive' size='24'>
								<IoMdNotificationsOutline />
							</Text>

							<div className='w-[1px] h-[30px] rounded-md bg-stroke-blue'></div>
							<AvatarGroup header user={user} avatarUrl={user.avatar?.url} />
						</div>
					</div>
				) : (
					<div className={"flex items-center gap-5"}>
						<Link href='/auth/sign-in'>
							<button>Sign In</button>
						</Link>
						<Link href='/auth/sign-up'>
							<button>Sign Up</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
