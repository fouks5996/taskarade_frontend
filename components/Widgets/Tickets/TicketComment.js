import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { createNotification } from "../../../services/api/notification";
import { useTicketComments } from "../../../services/api/ticket";
import { post } from "../../../services/config";
import { path } from "../../../services/routes";
import Button from "../../actions/Button";
import AvatarGroup from "../../Avatar/AvatarGroup";
import { errorMessageValues } from "../../Forms/Errors";
import Input from "../../Forms/Input";
import Loader from "../../Loader/Loader";
import Text from "../../Typography/Text";

export default function TicketComment({ ticketID, ticketName, ticketOwner }) {
	const { data: session } = useSession();
	const { comments, isLoading, mutate } = useTicketComments(ticketID);
	const measuredRef = useCallback((node) => {
		if (node !== null) {
			node.scrollTop = node.scrollHeight;
		}
	}, []);

	if (isLoading)
		return (
			<div className='flex h-full justify-center items-center'>
				<Loader type='spin' height={40} width={40} />{" "}
			</div>
		);

	return (
		<div className='mt-6 flex flex-col gap-6 '>
			{comments.data.length === 0 ? (
				<span>
					<Text size={"14"}> No comments </Text>
				</span>
			) : (
				<div
					ref={measuredRef}
					className='flex flex-col gap-6 max-h-[280px] overflow-y-scroll'>
					{comments.data.map((comment) => (
						<div key={comment.id} className='flex flex-col '>
							<div className='flex items-center gap-2'>
								<AvatarGroup
									minus
									user={comment.attributes.author.data.attributes}
									avatarUrl={
										comment.attributes.author.data.attributes.avatar.data
											?.attributes.url
									}
								/>

								<Text size={"13"} regular color='placeholder'>
									{new Date(comment.attributes.createdAt).toLocaleDateString(
										"fr-FR",
										{
											hour: "2-digit",
											minute: "2-digit",
										}
									)}
								</Text>
							</div>
							<span className='ml-8'>
								<Text regular size={"14"}>
									{" "}
									{comment.attributes.body}{" "}
								</Text>
							</span>
						</div>
					))}
				</div>
			)}

			<CreateComment
				mutate={mutate}
				ticketID={ticketID}
				userID={session.id}
				ticketOwner={ticketOwner}
				ticketName={ticketName}
			/>
		</div>
	);
}

export function CreateComment({
	mutate,
	ticketID,
	userID,
	ticketOwner,
	ticketName,
}) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const router = useRouter();
	const { id, pid } = router.query;

	const onSubmit = async (data) => {
		const bodyToSend = {
			data: {
				body: data.body,
				ticket: ticketID,
				author: userID,
			},
		};

		const { success, error } = await post(path("CREATE_comment"), bodyToSend);

		if (success) {
			mutate();
			emptyInput();
			const { ok } = await createNotification(
				`commented in ${ticketName}`,
				userID,
				ticketOwner,
				id,
				data.body,
				`/project/${id}/widget/${pid}`
			);

			if (!ok) {
				console.log("erreur notif comment");
			}
		} else {
			console.log(error);
		}
	};

	const emptyInput = () => {
		const input = document.getElementById("toDelete");
		return (input.value = "");
	};

	return (
		<form
			id='comment'
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center gap-2'>
			<Input
				placeholder='Write a comment'
				type={"text"}
				id='toDelete'
				register={register}
				name={"body"}
				errors={errors}
				validationsSchema={errorMessageValues.comments}
			/>
			<Button form='comment' width='fit' type='submit'>
				Post
			</Button>
		</form>
	);
}
