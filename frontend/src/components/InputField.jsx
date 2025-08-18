import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function InputFieldset(props) {
    const { label, icon, type = "text",  customClassName, togglePassword = false, birthDayInvalid, helperText = "", ...inputProps} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const handleBlur = (e) => {
        inputProps.onBlur?.(e);
        setTouched(true);
        if (e.target.name !== "birthDay") {
            setInvalid(!e.target.checkValidity());
        } 

        else {
            setInvalid(birthDayInvalid);
        }

        console.log("Input blurred:", invalid);
        console.log("touched:", touched);   
        
    };

    const handleChange = (e) => {
        inputProps.onChange?.(e);
        if (touched) {

            if(e.target.name !== "birthDay") {
                setInvalid(!e.target.checkValidity());
            }

            else {
                console.log("birthDayInValid:", birthDayInvalid);
                setInvalid(birthDayInvalid);
            }

            console.log("Input changed:", invalid);

        }
    };


    const inputType = togglePassword ? (showPassword ? "text" : "password") : type;

    return (
        <>
            <fieldset className={`border-[2px] border-[#ffffff33] rounded-3xl px-[15px] pb-2 mx-2 my-4  required ${customClassName || ''}  ${((helperText && touched && invalid) || birthDayInvalid) ? "border-red-600" : ""}`}>
                <legend className="text-[0.9rem] font-bold text-shadow-violet-600 px-2">{label}</legend>
                <input
                    {...inputProps}
                    type={inputType}
                    className="w-full px-2 pb-0.5 pt-1 text-[1.1rem] outline-none text-gray-700"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                />

                {icon && !togglePassword && (
                    <FontAwesomeIcon 
                        icon={inputProps.icon || ""}
                        className="absolute right-[60px] mt-1.5 mr-2 "
                        size="lg"/>
                )}

                {togglePassword && (
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[60px] mt-1.5 mr-2 cursor-pointer"
                        size="lg"
                    />
                )}

            </fieldset>

            {(helperText && ((touched && invalid) || birthDayInvalid)) && (
                <div className="text-sm text-red-600 px-5 mt-[-10px]">
                    {helperText}
                </div>
            )}

        </>
        

            
    );
}

export default InputFieldset;
