import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function InputFieldset(props) {
  const {
    label,
    icon,
    type,
    togglePassword = false,
    helperText = "",
    invalid = false,
    touched = false,
    customClassName,
    ...inputProps
  } = props;

  const inputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const inputType = togglePassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  const margin = inputProps.name === "confirmPassword" ? "mb-2" : "-mb-5";

  const handleTogglePassword = (e) => {
    e.preventDefault();

    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      inputRef.current?.setSelectionRange(start, end); // Restore cursor position
    }, 0);
  };

  return (
    <>
      <fieldset
        className={`border-[2px] border-[#ffffff33] rounded-4xl px-[15px] pb-2 mx-2 my-7 required ${
          customClassName || ""
        }  ${touched && invalid ? "border-red-600" : ""}`}
      >
        <legend className="font-medium text-shadow-violet-600 px-2">
          {label}
        </legend>
        <input
          ref={inputRef}
          {...inputProps}
          type={inputType}
          className="w-full px-2 pb-0.5 pt-1 outline-none text-gray-700"
          required
        />

        {icon && !togglePassword && (
          <FontAwesomeIcon
            icon={icon || ""}
            className={`absolute right-15 mt-1.5 mr-2 `}
            size="lg"
          />
        )}

        {togglePassword && (
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
            onClick={handleTogglePassword}
            className="absolute right-15 mt-1.5 mr-2 cursor-pointer"
            size="lg"
          />
        )}
      </fieldset>

      {touched && invalid && (
        <div className={`text-[13px] text-red-600 px-5 -mt-4 ${margin}`}>
          {helperText}
        </div>
      )}
    </>
  );
}

export default InputFieldset;
