function User({ color }) {
  function getColor() {
    if (color === "grey") return "#B1B1B1";
    if (color === "white") return "white";
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9998 4.33317C10.9998 6.08208 9.58205 7.49984 7.83317 7.49984C6.08429 7.49984 4.6665 6.08208 4.6665 4.33317C4.6665 2.58426 6.08429 1.1665 7.83317 1.1665C9.58205 1.1665 10.9998 2.58426 10.9998 4.33317Z"
        stroke={getColor()}
        strokeWidth="1.5"
      />
      <path
        d="M14 14.6663V14.6663C14 11.7208 11.6122 9.33301 8.66667 9.33301H7.33333C4.38782 9.33301 2 11.7208 2 14.6663V14.6663"
        stroke={getColor()}
        strokeWidth="1.5"
      />
    </svg>
  );
}

User.defaultProps = {
  color: "white",
};

export default User;
