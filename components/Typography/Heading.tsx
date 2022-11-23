import { ReactNode } from "react";

function Heading({ children, size, center }: HeadingProps) {
  const getSize = () => {
    if (size === "28") return "text-28";
    if (size === "20") return "text-20";
  };

  return (
    <h1
      className={`${getSize()} font-black text-grey-text-active ${
        center && "text-center"
      }`}
    >
      {children}
    </h1>
  );
}

export interface HeadingProps {
  children?: ReactNode;
  size: String;
  center: Boolean;
}

Heading.defaultProps = {
  title: "28",
  center: false,
};

export default Heading;
