/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react";
import { FaBook, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlinePermMedia } from "react-icons/md";
import Avatar from "../../generic-avatar.jpg";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { getCroppedImg } from "../../cropImage";

const Navbar = () => {
	const { user } = useContext(AuthContext);
	const [sidebar, setSidebar] = useState(false);
	const [image, setImage] = useState(null);
	const [userAvatar, setUserAvatar] = useState(null);
	const [finalImage, setFinalImage] = useState(null);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const onCropComplete = async (croppedArea, croppedAreaPixels) => {
		// console.log(croppedArea, croppedAreaPixels);
		const croppedImage =	await getCroppedImg(URL.createObjectURL(image), croppedAreaPixels);
		setFinalImage(croppedImage);
		// console.log(croppedImage);
	};

	const showSidebar = () => setSidebar(!sidebar);

	const logout = () => {
		localStorage.removeItem("user");
		window.location.href = "/";
	};

	const uploadImage = async (e) => {
		e.preventDefault();

		try {
			const data = new FormData();
			data.append("profilePic", finalImage);

			/*
		https://event-list-api.herokuapp.com/ 
		http://localhost:9000/
	*/
			let postRes = await axios.post(
				"http://localhost:9000/api/v1/user/update-avatar",
				data,
				{
					headers: {
						"content-type": "application/json",
						"access-token": user.token,
					},
				},
			);

			if (postRes.data.success) return toast.success(postRes.data.msg);
			setImage(null);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
	};

	const getUserAvatar = async () => {
		let res = await axios.get("http://localhost:9000/api/v1/user", {
			headers: {
				"content-type": "application/json",
				"access-token": user.token,
			},
		});
		setUserAvatar(res.data.userAvatar);
	};

	useEffect(() => {
		// getUserAvatar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAvatar]);

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
				<div className="user__profile__image">
					{image ? (
						<div className="crop-container image__preview">
							<Cropper
								image={URL.createObjectURL(image)}
								crop={crop}
								zoom={zoom}
								aspect={4 / 3}
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
								className="cropped-image"
							/>
							<div className="controls">
								<Slider
									value={zoom}
									min={1}
									max={3}
									step={0.1}
									aria-labelledby="Zoom"
									onChange={(e, zoom) => setZoom(zoom)}
									classes={{ root: "slider" }}
								/>
								<button onClick={uploadImage}>
									Update
								</button>
							</div>
						</div>
					) : (
						<div className="image__view uploader-container">
							<img
								src={userAvatar ? userAvatar.largeAvi : Avatar}
								alt="user image"
								className="user__avatar image-item"
							/>
							<form className="image-item overlay">
								<label>
									<MdOutlinePermMedia className="select__image-btn" />
									<input
										style={{ display: "none" }}
										className="imageUpload"
										type="file"
										name="profile_photo"
										placeholder="Photo"
										accept="image/*"
										onChange={(e) => setImage(e.target.files[0])}
									/>
								</label>
							</form>
						</div>
					)}
				</div>

				{user && (
					<span
						style={{
							position: "relative",
							left: "60px",
							top: "-50px",
							color: "aliceblue",
						}}
					>
						{user.user.fullname}
					</span>
				)}
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
						style={{ position: "absolute", bottom: "15px" }}
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
