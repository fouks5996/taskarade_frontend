import Head from "next/head";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import Input from "../../components/Forms/Input";
import Email from "../../components/Icons/Email";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createServerError,
  errorMessageValues,
  removeServerError,
} from "../../components/Forms/Errors";
import { post } from "../../services/config";
import { path } from "../../services/routes";
import User from "../../components/Icons/User";
import Layout from "../../components/Layout/Layout";
import Providers from "../../components/Providers/Providers";

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
    <Layout title="Signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={<Email color={"grey"} />}
          label={"Saisissez votre email"}
          type={"text"}
          name={"email"}
          register={register}
          errors={errors}
          validationsSchema={errorMessageValues.email}
        />
        <Input
          icon={<User color={"grey"} />}
          label={"Saisissez votre nom"}
          type={"text"}
          name={"username"}
          register={register}
          errors={errors}
          validationsSchema={errorMessageValues.username}
        />
        <Input
          icon={<Email color={"grey"} />}
          label={"Saisissez votre mot de passe"}
          type={"password"}
          register={register}
          name={"password"}
          errors={errors}
          validationsSchema={errorMessageValues.password}
        />
        {serverError.state && <p> {serverError.message} </p>}

        <button
          style={{
            marginTop: 15,
          }}
        >
          Sign Up
        </button>
      </form>
      <Providers providers={providers} />
    </Layout>
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
