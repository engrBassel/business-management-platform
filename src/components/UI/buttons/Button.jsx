function Button({
  type = "button",
  className,
  text,
  onButtonClick = () => {},
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-full transition-colors ${className}`}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
export default Button;
