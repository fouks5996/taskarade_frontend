function Email({ color }) {
  function getColor() {
    if (color === "red") return "#FF6868";
    if (color === "grey") return "#B1B1B1";
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6665 5.75L1.6665 14.9956C1.6665 16.1002 2.56193 16.9956 3.6665 16.9956L16.3332 16.9956C17.4377 16.9956 18.3332 16.1002 18.3332 14.9956L18.3332 5.75C18.3332 4.64543 17.4377 3.75 16.3332 3.75L3.6665 3.75C2.56193 3.75 1.6665 4.64543 1.6665 5.75Z"
        stroke={getColor()}
        strokeWidth="1.5"
      />
      <path
        d="M17.457 5.51605L11.2187 10.3125C10.4998 10.8652 9.499 10.8651 8.78023 10.3123L2.54475 5.51605"
        stroke={getColor()}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

Email.defaultProps = {
  color: "#B1B1B1",
};

export default Email;
