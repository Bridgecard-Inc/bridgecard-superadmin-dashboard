import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEnvironment } from "../redux/slices/app/appSlice";

export const Toggle = () => {
	const dispatch = useDispatch();
	const { environment } = useSelector(state => state.app);

	const toggle = () => {
		if (environment === "sandbox") {
			dispatch(setEnvironment("production"));
		} else if (environment === "production") {
			dispatch(setEnvironment("sandbox"));
		}
	};
	return (
		<div className="toggle-wrap">
			<p>Sandbox</p>
			<div
				className={environment === "sandbox" ? "toggle start" : "toggle end"}
				onClick={toggle}
			>
				<div className="toggle--switch"></div>
			</div>
			<p>Production</p>
		</div>
	);
};
