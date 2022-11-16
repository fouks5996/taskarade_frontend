function Play({ big = false }) {
  return (
    <>
      {big ? (
        <svg
          width="57"
          height="57"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.625 9.58253L6.875 13.4796C6.04167 13.9608 5 13.3594 5 12.3971L5 4.60288C5 3.64063 6.04167 3.03923 6.875 3.52035L13.625 7.41747C14.4583 7.89859 14.4583 9.10141 13.625 9.58253Z"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.625 9.58253L6.875 13.4796C6.04167 13.9608 5 13.3594 5 12.3971L5 4.60288C5 3.64063 6.04167 3.03923 6.875 3.52035L13.625 7.41747C14.4583 7.89859 14.4583 9.10141 13.625 9.58253Z"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </>
  );
}

export default Play;
