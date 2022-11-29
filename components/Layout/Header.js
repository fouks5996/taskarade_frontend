import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCurrentUser } from "../../services/api/user";
import AvatarGroup from "../Avatar/AvatarGroup";
import { IoMdNotificationsOutline } from "react-icons/io";
import Search from "../Search/Search";
import { useState } from "react";
import { NotificationDot, Notifications } from "../notification/Notifications";
import HeaderSkeleton from "../Skeleton/HeaderSkeleton";

export default function Header() {
	const { data: session } = useSession();
	const jwt = session?.jwt;
	const { user, isLoading, mutate } = useCurrentUser(jwt);
	const [showNotification, setShowNotification] = useState(false);

	if (isLoading) return <HeaderSkeleton />;

	function ifSeen() {
		return user?.notifications?.some(
			(notification) => notification.seen === false
		);
	}

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
							<div className='relative  text-20 font-regular text-grey-text-active'>
								<span
									onClick={() => setShowNotification(true)}
									className='cursor-pointer'>
									{" "}
									<IoMdNotificationsOutline /> {ifSeen() && <NotificationDot />}
								</span>
								{showNotification && (
									<span className='absolute top-8 -right-20'>
										<Notifications
											notifications={user.notifications}
											mutate={mutate}
											setShowNotification={setShowNotification}
										/>
									</span>
								)}
							</div>

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

Header.auth = true;
