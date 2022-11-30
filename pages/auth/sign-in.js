import {
	signIn,
	getProviders,
	getSession,
	getCsrfToken,
} from "next-auth/react";

import { useRouter } from "next/router";
import Input from "../../components/Forms/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	createServerError,
	errorMessageValues,
} from "../../components/Forms/Errors";
import Layout from "../../components/Layout/Layout";
import Providers from "../../components/Providers/Providers";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import Image from "next/image";
import wallpaper from "../../assets/img-signin.png";
import logo from "../../assets/Logo.png";
import Heading from "../../components/Typography/Heading";
import Button from "../../components/actions/Button";
import Text from "../../components/Typography/Text";

export default function SignIn({ providers }) {
	const router = useRouter();

	const [serverError, setServerError] = useState({ state: false, message: "" });
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const result = await signIn("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		console.log(result);
		if (result.ok) {
			router.replace("/");
		} else {
			await createServerError(
				setServerError,
				errorMessageValues.loginError.message
			);
		}
	};

	return (
		<div className='flex gap-10 justify-between '>
			<div className=' ml-20 flex flex-col my-14 gap-10'>
				<Image alt='logo' src={logo} layout='fixed' />
				<div>
					<Heading size='28'> Welcome Back. </Heading>

					<form
						id={"signin"}
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-7 mt-8'>
						<div className='flex flex-col gap-4'>
							<Input
								icon={<MdOutlineMail />}
								label={"Email"}
								placeholder='youremail@email.com'
								type={"text"}
								name={"email"}
								register={register}
								errors={errors}
								validationsSchema={errorMessageValues.email}
							/>
							<div className='flex flex-col gap-2'>
								<Input
									icon={<MdLockOutline />}
									label={"Password"}
									placeholder='°°°°°°°°°°°°'
									type={"password"}
									register={register}
									name={"password"}
									errors={errors}
									validationsSchema={errorMessageValues.password}
								/>
								<Text
									hoverUnderline
									medium
									pointer
									size='13'
									onclick={() => router.push("/auth/forgot-password")}>
									{" "}
									Forgot your password ?{" "}
								</Text>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<div className=' flex justify-center items-center'>
								{" "}
								{serverError.state && (
									<Text color='red' medium size='13'>
										{" "}
										{serverError.message}{" "}
									</Text>
								)}{" "}
							</div>
							<Button form={"signin"} submit principal>
								Login to your account
							</Button>
						</div>
					</form>
					<div className='flex flex-col justify-center items-center gap-4  mt-10'>
						<Text regular size='14'>
							- Or sign in with -
						</Text>
						<Providers providers={providers} />
					</div>
					<div className='flex justify-center items-center my-3'>
						<Text regular size='14'>
							You have no account ?
							<span
								onClick={() => router.replace("/auth/sign-up")}
								className='font-sb text-blue-300 cursor-pointer hover:underline'>
								{" "}
								Create your account !
							</span>
						</Text>
					</div>
				</div>
			</div>
			<div className='bg-red h-screen w-[60%] relative'>
				<Image
					src={wallpaper}
					alt='Picture of the Gorges du Verdon, France'
					layout='fill'
					objectFit='cover'
					objectPosition={"bottom"}
				/>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: "/" },
		};
	}
	return {
		props: {
			providers: await getProviders(),
			csrfToken: await getCsrfToken(context),
		},
	};
}
