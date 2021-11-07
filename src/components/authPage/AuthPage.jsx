import React, { useContext, useState } from "react";
import "./auth.css";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";

const Auth = () => {
	const [authType, setAuthType] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useContext(AuthContext);

	const loginSubmitHandler = (e) => {
		e.preventDefault();
		if (userEmail === "") return toast.error("Email is required");
		if (userPassword === "") return toast.error("Password is required");

		const user = {
			userEmail,
			userPassword,
		};

		loginCall(user, dispatch);
	};

	const registerSubmitHandler = async (e) => {
		e.preventDefault();

		if (fullname === "") return toast.error("Full name is required");
		if (email === "") return toast.error("Email is required");
		if (password === "") return toast.error("Password is required");

		const newUser = {
			fullname,
			email,
			password,
		};

		try {
			let res = await axios.post(
				"https://event-list-api.herokuapp.com/api/v1/auth/register",
				newUser,
			);
			if (res.data.success) toast.success(res.data.msg);
			setAuthType(true);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
	};

	const active = {
		borderBottom: "4px solid rgb(67, 67, 253)",
	};

	const inactive = {
		borderBottom: "none",
	};

	return (
		<div className="auth__container">
			<div className="toggle__button">
				<h2 style={authType ? active : inactive} onClick={() => setAuthType(true)}>
					Sign In
				</h2>
				<h2 style={authType ? inactive : active} onClick={() => setAuthType(false)}>
					Sign Up
				</h2>
			</div>
			<div className="auth__form">
				{authType ? (
					<>
						<form onSubmit={loginSubmitHandler}>
							<input
								type="email"
								placeholder="Email*"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="password*"
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
							<button type="submit">Sign In</button>
							<p onClick={()=> (window.location.href = "/reset")}>
								Forgot or Reset password ?
								<a href="/reset" className="">
									{" "}
									Reset
								</a>
							</p>
						</form>
					</>
				) : (
					<form onSubmit={registerSubmitHandler}>
						<input
							type="text"
							placeholder="Full Name*"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
						/>
						<input
							type="email"
							placeholder="email*"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="password*"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit">Sign Up</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Auth;
