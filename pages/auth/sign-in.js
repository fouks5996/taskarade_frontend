import {
  signIn,
  getProviders,
  getSession,
  getCsrfToken,
} from "next-auth/react";

import { useRouter } from "next/router";
import Input from "../../components/Forms/Input";
import Email from "../../components/Icons/Email";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createServerError,
  errorMessageValues,
} from "../../components/Forms/Errors";
import Layout from "../../components/Layout/Layout";
import Providers from "../../components/Providers/Providers";

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
    <Layout title="Signin">
      <h1>Sign In</h1>
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
          Sign In
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
