import React from "react";
import styled from "styled-components";
import Box from "./Box";
import { Text } from "./primitives";
import { setProgress } from "../redux/slices/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";

const StyledContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: auto;

	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		.circle {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 30px;
			min-height: 32px;
			border-radius: 50%;
			margin-right: 0;
			padding: 2px;
		}

		.label {
			font-size: 14px;
		}

		.line {
			width: 71px;
			height: 1px;
			background-color: #dfdfdf;
			margin: 0;
		}

		.line.active {
			width: 71px;
			height: 1px;
			background-color: #eec337;
			margin: 0;
		}

		&:last-child {
			.line {
				display: none;
			}
		}
	}

	@media (max-width: 600px) {
		display: none;
	}
`;
const Stepper = ({ steps }) => {
	const dispatch = useDispatch();
	const { progress } = useSelector(state => state.app);

	const handleChange = anotherPos => {
		if (progress > anotherPos) {
			dispatch(setProgress(anotherPos));
		}
	};

	const getActive = index => {
		if (progress === index) {
			return <SVG src={"../media/svg/stepper/current-step.svg"} />;
		} else if (progress > index) {
			return <SVG src={"../media/svg/stepper/complete-step.svg"} />;
		}

		return <SVG src={"../media/svg/stepper/null.svg"} />;
	};

	return (
		<StyledContainer>
			{steps.map((value, index) => (
				<div onClick={() => handleChange(index)} key={index} className="item">
					<Box className="circle">{getActive(index)}</Box>
					<Box className={progress > index ? "line active" : "line"}></Box>
				</div>
			))}
		</StyledContainer>
	);
};

export default Stepper;
