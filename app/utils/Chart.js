import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
	const options = {
		scales: {
			y: {
				min: 0,
				// max: 50,
			},
		},
	};

	return <Line data={chartData} options={options} />;
}

export default BarChart;
