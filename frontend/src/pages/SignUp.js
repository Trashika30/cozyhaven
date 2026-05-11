import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css";

const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
        password: "",
        contact: "",
        address: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = () => {

        if (
            !user.firstName ||
            !user.lastName ||
            !user.age ||
            !user.gender ||
            !user.email ||
            !user.password ||
            !user.contact ||
            !user.address
        ) {
            alert("Please fill all fields");
            return;
        }

        localStorage.setItem("cozyUser", JSON.stringify(user));

        alert("Account created successfully!");

        navigate("/login");
    };

    return (
        <>
            <div className={styles.navbar}>

                <div className={styles.logo}>
                    CozyHaven
                </div>

            </div>

            <div className={styles.container}>

                <div className={styles.left}>

                    <div className={styles["left-content"]}>

                        <h1>Welcom to CozyHaven</h1>

                        <p>
                            Join us and book your perfect stay with ease.
                        </p>

                    </div>

                </div>

                <div className={styles.right}>

                    <div className={styles.card}>

                        <h2>Create Account</h2>

                        <p>Fill your details to get started</p>

                        <div className={styles.row}>

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={handleChange}
                            />

                        </div>

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="contact"
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                        />

                        <button onClick={register}>
                            Create Account
                        </button>

                        <div className={styles.link}>

                            Already Registered?{" "}

                            <Link to={"/login"}>
                                Sign In
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default SignUp;