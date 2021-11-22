import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import EventPage from "./components/event/EventPage";
import { Toaster } from "react-hot-toast";
import AuthPage from "./components/authPage/AuthPage";
import Reset from "./components/authPage/Reset";
import EffectReset from "./components/authPage/EffectReset";

const App = () => {
	return (
		<div className="App">
			<Header />
			<Router>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/event-list" element={<EventPage />} />
					<Route path="/reset-password" element={<Reset />} />
					<Route path="/effect-reset" element={<EffectReset />} />
				</Routes>
			</Router>

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
