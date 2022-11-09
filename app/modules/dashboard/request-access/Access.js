import React from "react";
import { CurrentAddress } from "./components/CurrentAddress";
import { DirectorInfo } from "./components/DirectorInfo";
import { GeneralInfo } from "./components/GeneralInfo";
import { UploadDoc } from "./components/UploadDoc";
import Stepper from "../../../utils/Stepper";
import { RegisteredAddress } from "./components/RegisteredAddress";
import { useSelector } from "react-redux";

export const Access = () => {
	const steps = [
		"General Info",
		"Current Address",
		"Registered Address",
		"Director Info",
		"Upload Doc",
	];

	const { progress } = useSelector(state => state.app);
	return (
		<main className="access">
			<Stepper steps={steps} />
			<div className="access-form"></div>
			{progress === 0 && <GeneralInfo />}
			{progress === 1 && <CurrentAddress />}
			{progress === 2 && <RegisteredAddress />}
			{progress === 3 && <DirectorInfo />}
			{progress >= 4 && <UploadDoc />}
		</main>
	);
};
