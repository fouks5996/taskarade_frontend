import { ReactNode } from "react";

function Text({
  children,
  medium,
  base,
  baseL,
  small,
  xSmall,
  semiNormal,
  normal,
  semiBold,
  light,
  color,
  style,
  underline,
  pointer,
  center,
}: TextProps) {
  const fontSize = () => {
    if (xSmall) return "text-xs";
    if (small) return "text-s";
    if (base) return "text-base";
    if (baseL) return "text-baseL";
    if (medium) return "text-m";
  };

  const fontWeight = () => {
    if (light) return "font-light";
    if (semiNormal) return "font-semi_normal";
    if (normal) return "font-normal";
    if (semiBold) return "font-semi_bold";
  };

  const fontSpecial = () => {
    if (color === "purple") return "text-purple_dark font-normal text-xs";
    if (color === "grey") return "text-grey_dark";
    if (color === "red") return "text-red";
    if (style === "italic") return "italic";
  };
  return (
    <p
      className={`${fontSize()} ${fontWeight()} ${fontSpecial()} ${
        underline && "underline"
      } ${pointer && "cursor-pointer"}  ${center && "text-center"} font-inter`}
    >
      {" "}
      {children}{" "}
    </p>
  );
}

export interface TextProps {
  children?: ReactNode;
  medium: Boolean;
  base: Boolean;
  baseL: Boolean;
  small: Boolean;
  xSmall: Boolean;
  semiNormal: Boolean;
  normal: Boolean;
  semiBold: Boolean;
  light: Boolean;
  color: String;
  style: String;
  underline: Boolean;
  pointer: Boolean;
  center: Boolean;
}

Text.defaultProps = {
  medium: false,
  base: false,
  baseL: false,
  small: false,
  xSmall: false,
  semiNormal: false,
  normal: false,
  semiBold: false,
  light: false,
  color: "",
  style: "",
  underline: false,
  pointer: false,
  center: false,
};

export default Text;
