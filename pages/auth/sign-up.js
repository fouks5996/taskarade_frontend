import Head from "next/head";
import {
	getCsrfToken,
	getProviders,
	getSession,
	signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import Input from "../../components/Forms/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	createServerError,
	errorMessageValues,
	removeServerError,
} from "../../components/Forms/Errors";
import { post } from "../../services/config";
import { path } from "../../services/routes";

import Layout from "../../components/Layout/Layout";
import Providers from "../../components/Providers/Providers";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import wallpaper from "../../assets/img-signup.png";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import Heading from "../../components/Typography/Heading";
import Button from "../../components/actions/Button";
import Text from "../../components/Typography/Text";

export default function SignUp({ providers }) {
	const router = useRouter();
	const [serverError, setServerError] = useState({ state: false, message: "" });
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		const result = await post(path("register"), {
			email: data.email,
			username: data.username,
			password: data.password,
		});
		console.log(result);
		if (result.success.jwt) {
			router.replace("/auth/sign-in");
		} else {
			await createServerError(
				setServerError,
				errorMessageValues.signupError.message
			);
		}
	};

	return (
		<div className='flex gap-10 justify-between'>
			<div className=' ml-20 flex flex-col my-14 gap-10'>
				<Image alt='logo' src={logo} layout='fixed' />
				<div>
					<Heading size='28'> Create an account. </Heading>

					<form
						id={"signup"}
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-7 mt-4'>
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
							<Input
								icon={<AiOutlineUser />}
								label={"Username"}
								placeholder='John Doe'
								type={"text"}
								name={"username"}
								register={register}
								errors={errors}
								validationsSchema={errorMessageValues.username}
							/>
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
						</div>
						<div className='flex flex-col gap-2'>
							<div className='max-w-[300px] flex justify-center items-center'>
								{" "}
								{serverError.state && (
									<Text color='red' medium size='13'>
										{" "}
										{serverError.message}{" "}
									</Text>
								)}{" "}
							</div>
							<Button form={"signup"} submit principal>
								Create my account
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
							You already have an account ?
							<span
								onClick={() => router.replace("/auth/sign-in")}
								className='font-sb text-blue-300 cursor-pointer hover:underline'>
								{" "}
								Please signin !
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
