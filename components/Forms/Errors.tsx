import { UseFormSetError } from "react-hook-form";

export const errorInput = (target: UseFormSetError<any>, name: string) => {
  return target[name] ? "border border-red" : "border-none";
};

export const errorMessage = (target: UseFormSetError<any>, name: string) => {
  return (
    target && <span className="text-red text-13 font-regular">{target[name]?.message}</span>
  );
};

export const removeServerError = (setServerError: Function) => {
  setTimeout(() => {
    setServerError({
      state: false,
      message: "",
    });
  }, 6000);
};

export const createServerError = async (
  setServerError: Function,
  message: string
) => {
  await setServerError({
    state: true,
    message: message,
  });
  removeServerError(setServerError);
};

export const errorMessageValues = {
  email: {
    required: "L'email est requis",
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: "L'email que vous avez saisi n'est pas valide",
    },
  },
  
  subject: {
    required: "Required",
  },

  description: {
    required: "Required",
  },
  
  estimated_time:{
    required: "Required",
    pattern: {
      value: /^[0-9]*$/,
      message: "Only numbers",
    },
  },

  username: {
    required: "Le pseudo est requis",
    maxLength: {
      value: 20,
      message: "Le pseudo doit faire maximum 20 caractères",
    },
    minLength: {
      value: 3,
      message: "Le pseudo doit faire minimum 3 caractères",
    },
  },

  password: {
    required: "Le mot de passe est requis",
    // pattern: {
    //   value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    //   message:
    //     "Le mot de passe doit contenir au moins une lettre, un nombre et un caractère spécial",
    // },
    // maxLength: {
    //   value: 20,
    //   message: "Le mot de passe doit faire maximum 20 caractères",
    // },
    // minLength: {
    //   value: 8,
    //   message: "Le mot de passe doit faire minimum 8 caractères",
    // },
  },

  loginError: {
    message: "Your credentials don't seem to match",
  },

  signupError: {
    message:
      "An error has occurred, the email you entered may already exist",
  },
};
