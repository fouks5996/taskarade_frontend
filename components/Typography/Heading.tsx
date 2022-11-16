import { ReactNode } from "react";
import Text from "./Text";

function Heading({
  children,
  subTitle,
  title,
  sectionTitle,
  center,
}: HeadingProps) {
  const getSize = () => {
    if (subTitle) return "text-m";
    if (title) return "text-xxl leading-[50px]";
    if (sectionTitle) return "text-xl";
  };

  return (
    <h1
      className={`${getSize()} font-inter ${center && "text-center"} font-bold`}
    >
      {" "}
      {children}{" "}
    </h1>
  );
}

export interface HeadingProps {
  children?: ReactNode;
  subTitle: Boolean;
  title: Boolean;
  sectionTitle: Boolean;
  center: Boolean;
}

Heading.defaultProps = {
  subTitle: false,
  title: false,
  sectionTitle: false,
  center: false,
};

export default Heading;
