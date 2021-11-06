import React, { useRef } from "react";
import axios from "axios";
import "./reset.css";
import toast from "react-hot-toast";
// import { useHistory } from "react-router-dom";

const Reset = () => {
	const email = useRef();
	// const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email.current.value) return toast.error("Email address is required");

		const user = {
			email: email.current.value,
		};

		try {
			let res = await axios.post(
				// "http://localhost:9000/api/v1/auth/reset",
				"https://event-list-api.herokuapp.com/api/v1/auth/reset",
				user,
			);
			if (res.data.success) toast.success(res.data.msg);
			window.location.href = "/effect-reset";
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
	};

	return (
		<div className="register">
			<div className="form-flex">
				<div className="container-form register-form">
					<div className="heading">
						<h1>User Password Reset</h1>
					</div>
					<br />
					<p>Enter the email to your account</p>
					<br />
					<br />
					<form onSubmit={handleSubmit} className="auth register-form">
						<label for="email">Email</label>
						<input
							type="email"
							name="email"
							id=""
							placeholder="name@gmail.com"
							ref={email}
						/>
						<input className="form__submit-button" type="submit" value="Submit" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Reset;
