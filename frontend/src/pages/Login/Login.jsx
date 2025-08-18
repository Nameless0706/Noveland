import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from "./Login.module.css";


function Login(){

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(console.log(username + password))
        .then(res => res.json())
        .then(data => {
            if(data){ alert("Login successful!"); console.log(data)}
            else { alert("Login failed!");}

        })
        .catch(err => {
            console.error("Login error:", err);
            alert("An error occured!");
        });
}


    return (
        
        <div className={styles.container}>
            <div className={styles["login-form"]}>
                <h1 className="font-bold">Noveland</h1>
                <form onSubmit={handleSubmit}>

                    <div className={styles["input-box"]}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"  required /> 
                        <FontAwesomeIcon icon={faUser} className={styles["input-icon"]} size="lg"/>
                    </div>
                    <div className={styles["input-box"]}>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        <FontAwesomeIcon icon={faLock} className={styles["input-icon"]} size="lg"/>
                    </div>

                    <div className={styles["remember-forgot"]}>   
                        <label> <input type="checkbox"/> Remember me</label>
                        <a href="#">Forgot password?</a>

                    </div>

                    <button type="submit" className={styles["login-btn"]}>Login</button>

                    <div className={styles.register}>
                        <p>Chưa có tài khoản? <a href="/register">Đăng ký</a> </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;