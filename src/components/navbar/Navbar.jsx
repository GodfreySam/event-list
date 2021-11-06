import React, { useState } from "react";
import $ from "jquery";
import { FaBook, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
	const [sidebar, setSidebar] = useState(false);

	$("#profileImage").click(function (e) {
		$("#imageUpload").click();
	});

	function fasterPreview(uploader) {
		if (uploader.files && uploader.files[0]) {
			$("#profileImage").attr(
				"src",
				window.URL.createObjectURL(uploader.files[0]),
			);
		}
	}

	$("#imageUpload").change(function () {
		fasterPreview(this);
	});

	const showSidebar = () => setSidebar(!sidebar);

	const logout = () => {
		localStorage.removeItem("user");
		window.location.href = "/";
	};

	return (
		<>
			<div className="navbar">
				<div className="menu__bars">
					<span
						className={sidebar ? "menu-btn close" : "menu-btn"}
						onClick={showSidebar}
					>
						<div className="btn-line"></div>
						<div className="btn-line"></div>
						<div className="btn-line"></div>
					</span>
				</div>
			</div>
			<nav className={sidebar ? "nav__menu active" : "nav__menu"}>
				<ul className="nav__menu__items nav__image">
					<li style={{ listStyle: "none" }}>
						<div id="profile-container">
							<image id="profileImage" src="" />
						</div>
						<input
							id="imageUpload"
							type="file"
							name="profile_photo"
							placeholder="Photo"
							required=""
							capture
						/>
					</li>
				</ul>
				<ul className="nav__menu__items" onClick={showSidebar}>
					<li className="nav__text">
						<FaBook className="nav__icon" /> <span>Notes</span>
					</li>
					<hr />
					<li className="nav__text">
						<FaTrashAlt className="nav__icon" /> <span>Trash</span>
					</li>
					<hr />
					<li
						style={{ position: "absolute", bottom: "5px" }}
						className="nav__text"
						onClick={logout}
					>
						<FaSignOutAlt className="nav__icon" /> <span>Sign out</span>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
