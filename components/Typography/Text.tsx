import { ReactNode } from "react";

function Text({
  children,
  size,
  color,
  underline,
  pointer,
  center,
  black,
  bold,
  sb,
  medium,
  medium_italic,
  regular,
  onclick,
  hoverUnderline
}: TextProps) {
  const fontSize = () => {
    if (size === "12") return "text-12";
    if (size === "13") return "text-13";
    if (size === "14") return "text-14";
    if (size === "16") return "text-16";
    if (size === "18") return "text-18";
    if (size === "20") return "text-20";
    if (size === "24") return "text-24";
    if (size === "28") return "text-28";
  };

  const fontWeight = () => {
    if (black) return "font-black";
    if (bold) return "font-bold";
    if (sb) return "font-sb";
    if (medium) return "font-medium";
    if (medium_italic) return "font-medium_italic";
    if (regular) return "font-regular";
  };

  const fontSpecial = () => {
    if (color === "active") return "text-grey-text-active";
    if (color === "inactive") return "text-grey-text-inactive";
    if (color === "placeholder") return "text-grey-text-placeholder";
    if (color === "red") return "text-red";
  };
  return (
    <p
    onClick={() => onclick()}
      className={`${fontSize()} ${fontWeight()} ${fontSpecial()} ${
        underline && "underline"
      } ${
        hoverUnderline && "hover:underline"
      } ${pointer && "cursor-pointer"} break-all ${center && "text-center"}`}
    >
      {" "}
      {children}{" "}
    </p>
  );
}

export interface TextProps {
  children?: ReactNode;
  black: Boolean;
  bold: Boolean,
  sb: Boolean,
  medium: Boolean,
  medium_italic: Boolean,
  regular: Boolean,
  size: String
  color: String;
  underline: Boolean;
  hoverUnderline: Boolean;
  pointer: Boolean;
  center: Boolean;
  onclick: Function
}

Text.defaultProps = {
  black: false,
  bold: false,
  sb: false,
  medium: true,
  medium_italic: false,
  regular: false,
  size: "16",
  color: "active",
  underline: false,
  hoverUnderline:false,
  pointer: false,
  center: false,
  onclick: () => {}
};

export default Text;
