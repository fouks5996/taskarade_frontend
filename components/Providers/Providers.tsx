import Provider from "./Provider";

function Providers({ providers }: ProvidersProps) {
  return (
    <div>
      {Object.values(providers)
        .filter((provider) => provider.id !== "credentials")
        .map((provider) => (
          <Provider key={provider.id} provider={provider} />
        ))}
    </div>
  );
}

export interface ProvidersProps {
  providers: Object;
}

export default Providers;
