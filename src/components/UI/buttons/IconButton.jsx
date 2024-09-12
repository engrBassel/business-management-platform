function IconButton({
  type = "button",
  Icon,
  className,
  onIconClick = () => {},
}) {
  return (
    <button type={type} onClick={onIconClick}>
      <Icon className={`size-10 p-2 rounded-full ${className}`} />
    </button>
  );
}
export default IconButton;
