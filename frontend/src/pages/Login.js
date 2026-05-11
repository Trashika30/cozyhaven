import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.module.css";
const Login = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [storedEmail, setStoredEmail] = useState("");
    let [storedPassword, setStoredPassword] = useState("");

    let [invalidFlag, setInvalidFlag] = useState(false);

    let nav = useNavigate();

    useState(
        ()=>{
            let user = JSON.parse(localStorage.getItem("cozyUser"));
            if(user){
                setStoredEmail(user.email);
                setStoredPassword(user.password);
            }
        }, []
    )

    const validate = () => {
        if(email === storedEmail && password === storedPassword){
            alert("Login success!!");
            nav("/");
        }
        else
            setInvalidFlag(true);            
    }

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    CozyHaven
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                </div>
            </div>
            <div className="container">
                <div className="left">
                    <div className="left-content">
                        <h1>Welcome Back to CozyHaven</h1>
                        <p>Book your perfect stay with comfort and ease.</p>
                    </div>
                </div>
                <div className="right">
                    <div className="card">
                        <h2>Sign In</h2>
                        {
                            !invalidFlag ? <p>Enter your credentials to continue</p>
                            : <p>Invalid credentials!!</p>
                        }
                        <input type="email" placeholder="Email Address" onChange={e=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <div className="forgot-password">
                            <Link to={"/forgotPassword"}>Forgot password?</Link>
                        </div>
                        <button onClick={validate}>Sign In</button>
                        <div className="link">
                            New user?{" "}
                            <Link to={"/signUp"}>Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;