import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phone: localStorage.getItem("verifiedPhone") || "",
	});
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        // ✅ Pre-fill phone number from localStorage
        const verifiedPhone = localStorage.getItem("verifiedPhone");
        if (verifiedPhone) {
            setData((prev) => ({ ...prev, phone: verifiedPhone }));
        }
    }, []);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (!data.phone) {
			setError("Phone number verification required.");
			return;
		}
	
		try {
			const url = "http://localhost:8080/api/users/";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};
	

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Login
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={data.firstName} required className={styles.input} />
                        <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={data.lastName} required className={styles.input} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                        <input type="text" value={data.phone} disabled className={styles.input} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.green_btn}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
