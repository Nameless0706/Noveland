import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function InputFieldset(props) {
  const {
    label,
    icon,
    type = "text",
    togglePassword = false,
    helperText = "",
    invalid = false,
    touched = false,
    customClassName,
    ...inputProps
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const inputType = togglePassword
    ? showPassword
      ? "text"
      : "password"
    : type;


  return (
    <>
      <fieldset
        className={`border-[2px] border-[#ffffff33] rounded-4xl px-[15px] pb-2 mx-2 my-4  required ${
          customClassName || ""
        }  ${helperText && touched && invalid ? "border-red-600" : ""}`}
      >
        <legend className="font-medium text-shadow-violet-600 px-2">
          {label}
        </legend>
        <input
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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-15 mt-1.5 mr-2 cursor-pointer"
            size="lg"
          />
        )}
      </fieldset>

      {helperText && touched && invalid && (
        <div className="text-sm text-red-600 px-5 mt-2.5">{helperText}</div>
      )}
    </>
  );
}

export default InputFieldset;
