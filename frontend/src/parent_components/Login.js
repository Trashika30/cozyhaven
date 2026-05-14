import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/login.module.css";
const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [storedEmail, setStoredEmail] = useState("");
  let [storedPassword, setStoredPassword] = useState("");

  let nav = useNavigate();

  useState(() => {
    let user = JSON.parse(localStorage.getItem("cozyUser"));
    if (user) {
      setStoredEmail(user.email);
      setStoredPassword(user.password);
    }
  }, []);

  const validate = () => {
    if (email === "" || password === "") {
      Modal.error({
        title: "Missing Fields",
        content: "Please fill all fields before submitting.",
        okText: "OK",
        okButtonProps: {
          style: {
            backgroundColor: "#9C0A8F",
            borderColor: "#9C0A8F",
          },
        },
      });
      return;
    } else if (email === storedEmail && password === storedPassword) {
      Modal.success({
        title: "Success",
        content: "Login Success!!",
        okText: "OK",
        okButtonProps: {
          style: {
            backgroundColor: "#9C0A8F",
            borderColor: "#9C0A8F",
          },
        },
      });
      nav("/");
    } else
      Modal.error({
        title: "Invalid User",
        content: "Email or Password is not correct!!",
        okText: "OK",
        okButtonProps: {
          style: {
            backgroundColor: "#9C0A8F",
            borderColor: "#9C0A8F",
          },
        },
      });
    return;
  };

  return (
    <>
      <div className={style.navbar}>
        <div className={style.logo}>CozyHaven</div>
        <div className={style["nav-links"]}>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style["left-content"]}>
            <h1>Welcome Back to CozyHaven</h1>
            <p>Book your perfect stay with comfort and ease.</p>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.card}>
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={style["forgot-password"]}>
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </div>
            <button onClick={validate}>Sign In</button>
            <div className={style.link}>
              New user? <Link to={"/signUp"}>Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
