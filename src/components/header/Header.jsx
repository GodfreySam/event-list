import React from "react";
import "./header.css";

const Header = () => {
	return (
		<div className="header__container">
			<div className="header__head">
				<h1>Event List</h1>
			</div>
         <div className="header__body">
            To be completely in control of your time is to be in control of your life;
            such can be said to be a form of power and with power comes great responsibilty.
            Responsibility in nutshell means being responsible.
         </div>
		</div>
	);
};

export default Header;
