import React from "react";
import ReactLoading from "react-loading";

function Loader({ type, color, height, width }: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
}

export interface LoaderProps {
  type?: any | string;
  color?: string;
  height?: string | number;
  width?: string | number;
}

export default Loader;
