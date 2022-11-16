import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Text from "../Typography/Text";

function Provider({ provider }: ProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitProvider = (providerId: string) => {
    setLoading(true);
    return signIn(providerId);
  };

  const authDeclaration = (name: string) => {
    if (router.asPath === "/auth/sign-in") {
      return <Text> Connectez vous avec {name} </Text>;
    } else {
      return <Text> Créez votre compte avec {name} </Text>;
    }
  };

  return (
    <div key={provider.name}>
      <div
        className={
          "border border-black p-3 w-fit hover:bg-black hover:text-white cursor-pointer"
        }
      >
        <button onClick={() => submitProvider(provider.id)}>
          {authDeclaration(provider.name)}
        </button>
      </div>
      {loading && <p> Connecting to {provider.name} ... </p>}
    </div>
  );
}

interface ProviderProps {
  provider: {
    name?: string;
    id?: string;
  };
}

export default Provider;
