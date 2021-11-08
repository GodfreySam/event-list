import React from "react";
import $ from "jquery";
import "./profile.css";

window.$ = window.jQuery = require("jquery");

const Profile = () => {

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

	return (
		<div className="user__profile__image">
			<div id="profile-container">
				<image id="profileImage" src="http://lorempixel.com/100/100" />
			</div>
			<input
				id="imageUpload"
				type="file"
				name="profile_photo"
				placeholder="Photo"
				required=""
				capture
			></input>
		</div>
	);
};

export default Profile;
