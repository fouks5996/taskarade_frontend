function Arrow({ direction = "right" }) {
  function arrowDirection() {
    if (direction === "left") return "rotate(180)";
    if (direction === "right") return "rotate(0)";
  }
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      transform={arrowDirection()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.125 8.5L14.875 8.5M14.875 8.5L9.91667 3.1875M14.875 8.5L9.91667 13.8125"
        stroke="#ECECEC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Arrow;
