function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button type={type} onClick={onClick}
      className={`
        bg-black
        text-white
        px-4
        py-2
        rounded-lg
        hover:opacity-90
        transition
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;