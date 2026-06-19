// ye function hi input h aur iske ander ke var pass by ref(props) h
function Input({
  label,
  type = "text", //if nobody provide type then text will assign
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {label}
      </label>

      <input name={name} type={type} placeholder={placeholder} value={value}
        onChange={onChange}  
        className="
          border
          rounded-lg
          px-4
          py-2
          outline-none
          focus:ring-2
          focus:ring-black
        "
      />
    </div>
  );
}

export default Input;