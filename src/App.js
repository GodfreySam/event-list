import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/header/Header";
import EventPage from "./components/event/EventPage";
import { Toaster } from "react-hot-toast";
import AuthPage from "./components/authPage/AuthPage";
// import Reset from "./components/authPage/Reset";
// import EffectReset from "./components/authPage/EffectReset";

const App = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="App">
			<Header />

			{user ? (
					<EventPage />
			) : (
				<AuthPage />
			)}

			{/* <Router>
				<Routes>
					<Route path="/reset-password" exact component={Reset}></Route>
					<Route path="/effect-reset" exact component={EffectReset}></Route>
				</Routes>
			</Router> */}

			<Toaster
				position="top-right"
				toastOptions={{
					className: "",
					duration: 7000,
					style: {
						color: "#fff",
					},
					success: {
						style: {
							background: "green",
						},
					},
					error: {
						style: {
							background: "red",
						},
					},
				}}
			/>
		</div>
	);
};

export default App;
