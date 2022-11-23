import React from "react";
import Input from "../../components/Forms/Input";
import Heading from "../../components/Typography/Heading";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { errorMessageValues } from "../../components/Forms/Errors";
import Button from "../../components/actions/Button";
import { post } from "../../services/config";
import { path } from "../../services/routes";

export default function ForgotPassword() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const { success, error } = await post(path("forgot-password"), data);
		if (success) {
			console.log(success);
		} else {
			console.log(error);
			alert("erreur lors de la création");
		}
	};

	return (
		<div className='flex flex-col gap-10 justify-center h-screen items-center'>
			<Heading size={"28"}> Forgot your password ? </Heading>
			<form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
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
				<Button submit principal>
					Reset password
				</Button>
			</form>
		</div>
	);
}
