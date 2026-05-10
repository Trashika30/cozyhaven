import { useState } from "react";
import "./login.css";
const Login = () => {

    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();



    return (
        <>
            <div className="navbar">
                <div className="logo">
                    CozyHaven
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                </div>
            </div>
            <div className="container">
                <div className="left">
                    <div className="left-content">
                        <h1>Welcome Back to CozyHaven</h1>
                        <p>
                            Book your perfect stay with comfort and ease.
                        </p>
                    </div>
                </div>
                <div className="right">
                    <div className="card">
                        <h2>Sign In</h2>
                        <p>
                            Enter your credentials to continue
                        </p>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                        <div className="forgot-password">
                            Forgot password?
                        </div>
                        <button>
                            Sign In
                        </button>
                        <div className="link">
                            New user?{" "}
                            <span>
                                Create account
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;