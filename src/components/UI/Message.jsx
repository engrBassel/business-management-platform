function Message({ type, message }) {
  return (
    <p
      className={`text-3xl text-center font-bold ${
        type === "error"
          ? "text-red-600"
          : type === "hint"
          ? "text-gray-400"
          : ""
      }`}
    >
      {message}
    </p>
  );
}
export default Message;
