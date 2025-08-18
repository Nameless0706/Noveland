import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import InputFieldset from "../../components/InputField.jsx";



function Register(){

    //State to manage form values

    const [formValues, setFormValues] = useState({
        username: "",
        firstname: "",
        lastname: "",
        birthDay: "",
        email: "",
        password: "", 
        confirmPassword: ""  
    });

    //Manage touched and invalid states for first and last name fields

    const [firstTouched, setFirstTouched] = useState(false);
    const [lastTouched, setLastTouched] = useState(false);
    const [firstInvalid, setFirstInvalid] = useState(false);
    const [lastInvalid, setLastInvalid] = useState(false);



    const [birthDayInValid, setBirthDayInValid] = useState(false);

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            icon: faUser,
            helperText: "Username should be at least 5-16 characters and not contains special characters.",
            pattern: "^[A-Za-z0-9]{5,16}$"
        },

        {
            id: 2,
            name: "firstname",
            type: "text",
            placeholder: "First Name",
            label: "First Name",
            pattern: "^[A-Za-z0-9]{1,16}$"
        },

        {
            id: 3,
            name: "lastname",
            type: "text",
            placeholder: "Last Name",
            label: "Last Name",
            pattern: "^[A-Za-z0-9]{1,16}$"
        },

        {
            id: 4,
            name: "birthDay",
            type: "date",
            placeholder: "Date of Birth",
            label: "Date of Birth",
            helperText: "Date of birth must be in the past.",
        },

        {
            id: 5,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            helperText: "Email must be a valid email address.",
        },

        {
            id: 6,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            helperText: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        },

        {
            id: 7,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            label: "Confirm Password",
            helperText: "Passwords don't match, please try again.",
            pattern: formValues.password,
        }
    ];


    const handleFirstBlur = (e) => {
        setFirstTouched(true);
        setFirstInvalid(!e.target.checkValidity());
        console.log("First name input blurred:", firstInvalid);
        console.log("First touched:", firstTouched);
    };

    
    const handleLastBlur = (e) => {
        setLastTouched(true);
        setLastInvalid(!e.target.checkValidity());
        console.log("Last name input blurred:", lastInvalid);
        console.log("Last touched:", lastTouched);
    };


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        console.log("parenet onchange");
        
        if (name === "birthDay") {

            const selectedDate = new Date(value);
            selectedDate.setHours(0,0,0,0);

            const today = new Date();
            today.setHours(0,0,0,0); 


            if (selectedDate >= today) {
                setBirthDayInValid(true);
                console.log("Invalid birth date:", value);
            } 

            else {
                setBirthDayInValid(false);
                console.log("Valid birth date:", value);
            }
        }

        else if (name === "firstname") {
            setFirstTouched(true);
            setFirstInvalid(!e.target.checkValidity());

        }

        else if (name === "lastname") {
            setLastTouched(true);
            setLastInvalid(!e.target.checkValidity());
        }


    }

    const handleSubmit = (e) => { 
        e.preventDefault();
    }

    console.log(formValues);


    return (
        <div className="flex justify-center items-center bg-[url('/src/assets/bg.jpg')] bg-cover min-h-screen text-[#5A4B9C] pt-2 overflow-hidden">
                    <div className="w-[450px] backdrop-blur-lg rounded-[20px] shadow-[0_0_10px_rgba(0,0,0,0.2)] px-10 py-5">
                        <h1 className="font-bold text-center text-[2.5rem]">Register</h1>
                        <form onSubmit={handleSubmit}>
                            
                            <InputFieldset
                                key={inputs[0].id} // username
                                {...inputs[0]}
                                value={formValues.username}
                                onChange={handleChange}                  
                            />

                            <div className="peer grid grid-cols-2 gap-4">
                                    <InputFieldset
                                        key={inputs[1].id} // firstname
                                        {...inputs[1]}
                                        value={formValues.firstname}
                                        onChange={handleChange}
                                        onBlur={handleFirstBlur}
                                    />

                                    <InputFieldset
                                        key={inputs[2].id} // lastname
                                        {...inputs[2]}
                                        value={formValues.lastname}
                                        onChange={handleChange}
                                        onBlur={handleLastBlur}
                                    />
                                    
                                    
                            </div>

                            {((firstTouched && firstInvalid) || (lastTouched && lastInvalid)) && (
                                <div className="text-sm text-red-600 px-5 mt-[-10px]">
                                    First or last name should not empty or contain special characters.
                                </div>
                            )}

                            <InputFieldset
                                key={inputs[3].id}
                                {...inputs[3]}
                                birthDayInvalid={birthDayInValid}
                                value={formValues.birthDay}
                                onChange={handleChange}
                            />

                            

                            {inputs.slice(4).map((input) => { // Bắt đầu từ index 4
                                return (
                                    <InputFieldset
                                        key={input.id}
                                        {...input}
                                        value={formValues[input.name]}
                                        onChange={handleChange}
                                    />
                                );
                            })}
 
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-[250px] mt-2 font-bold justify-center items-center backdrop-blur-lg rounded-3xl py-3.5 shadow-[0_0_10px_rgba(0,0,0,0.2)] cursor-pointer text-[1.2rem] text-[#5A4B9C]">
                                        Register
                                </button>
                            </div>
        
                        </form>
                    </div>
                </div>
            )
}
export default Register;