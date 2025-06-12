import "../../css/Login.css";

function Login(){
    return (
        <div className="container">
            <div className="login-form">
                <h1>Noveland</h1>
                <form action={"/"}>

                    <div className="input-box">
                        <input type="text" placeholder="Username" required/>
                    </div>
                    
                    <div className="input-box">
                        <input type="text" placeholder="Password" required/>
                    </div>

                    <div className="remember-forgot">   
                        <label> <input type="checkbox"/> Remember me</label>
                        <a href="#">Forgot password?</a>

                    </div>

                    <button type="submit" className="login-btn">Login</button>

                    <div className="register">
                        <p>Chưa có tài khoản? <a href="#">Đăng ký</a> </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;