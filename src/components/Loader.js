import React from "react";
import "./Loader.css";

const Loader = ({ loadingMessage }) => {
	return (
		<div className="loader">
			<div className="spinner"></div>
			{loadingMessage && <p className="loading-message">{loadingMessage}</p>}
		</div>
	);
};

export default Loader;
