import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Text from "../Typography/Text";
import Loader from "../Loader/Loader";

function Provider({ provider }: ProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitProvider = (providerId: string) => {
    setLoading(true);
    return signIn(providerId);
  };

  const authDeclaration = (name: string) => {
    if (router.asPath === "/auth/sign-in") {
      return (
        <Text regular size="14">
          {" "}
          {name}{" "}
        </Text>
      );
    } else {
      return (
        <Text regular size="14">
          {" "}
          {name}{" "}
        </Text>
      );
    }
  };

  const authIcon = (name: string) => {
    if (name === "GitHub") {
      return (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2.6001C7.25658 2.6001 2.59998 7.2567 2.59998 13.0001C2.59998 17.8734 5.95571 21.951 10.4797 23.0794C10.4312 22.939 10.4 22.7761 10.4 22.5742V20.7966C9.97791 20.7966 9.27071 20.7966 9.09304 20.7966C8.38151 20.7966 7.74884 20.4907 7.44204 19.9222C7.10144 19.2904 7.04251 18.324 6.19838 17.733C5.94791 17.5362 6.13858 17.3118 6.42718 17.3421C6.96018 17.4929 7.40218 17.8586 7.81818 18.4012C8.23244 18.9446 8.42744 19.0676 9.20138 19.0676C9.57664 19.0676 10.1382 19.046 10.6669 18.9628C10.9512 18.2408 11.4426 17.5761 12.0432 17.2624C8.57998 16.9062 6.92724 15.1832 6.92724 12.8441C6.92724 11.837 7.35624 10.8629 8.08511 10.0422C7.84591 9.2275 7.54518 7.5661 8.17698 6.93343C9.73524 6.93343 10.6773 7.94396 10.9035 8.21696C11.68 7.9509 12.5328 7.8001 13.429 7.8001C14.3268 7.8001 15.1831 7.9509 15.9614 8.2187C16.185 7.94743 17.1279 6.93343 18.6896 6.93343C19.324 7.56696 19.0198 9.2353 18.778 10.0482C19.5026 10.8672 19.929 11.8388 19.929 12.8441C19.929 15.1815 18.2788 16.9036 14.8208 17.2615C15.7724 17.7581 16.4666 19.1534 16.4666 20.2047V22.5742C16.4666 22.6643 16.4467 22.7293 16.4363 22.8064C20.4888 21.386 23.4 17.538 23.4 13.0001C23.4 7.2567 18.7434 2.6001 13 2.6001Z"
            fill="#DADAE2"
          />
        </svg>
      );
    } else if (name === "Google") {
      return (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5034 2.6001C7.75823 2.6001 3.09998 7.2567 3.09998 13.0001C3.09998 18.7435 7.75823 23.4001 13.5034 23.4001C22.1787 23.4001 24.1332 15.3462 23.3194 11.2668H22.1666H20.2014H13.5V14.7334H20.2065C19.4355 17.7219 16.7291 19.9334 13.5 19.9334C9.67104 19.9334 6.56664 16.829 6.56664 13.0001C6.56664 9.17116 9.67104 6.06676 13.5 6.06676C15.2411 6.06676 16.8272 6.71308 18.0449 7.77301L20.5078 5.31182C18.6583 3.62702 16.2013 2.6001 13.5034 2.6001Z"
            fill="#DADAE2"
          />
        </svg>
      );
    }
  };

  return (
    <div key={provider.name}>
      <div
        className={
          "flex items-center gap-3 bg-blue-600 py-2 px-8 rounded-md w-fit hover:bg-blue-700  cursor-pointer"
        }
      >
        {authIcon(provider.name)}
        {loading ? (
          <Loader type="spin" height={16} width={16} />
        ) : (
          <button className="mt-1" onClick={() => submitProvider(provider.id)}>
            {authDeclaration(provider.name)}
          </button>
        )}
      </div>
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
