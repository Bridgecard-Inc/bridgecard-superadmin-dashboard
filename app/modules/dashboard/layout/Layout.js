import React from "react";
import DashboardHeader from "./DashboardHeader";
import { Aside } from "./Aside";

export const Layout = ({ children }) => {
	return (
		<main className="dashboard-layout">
			<Aside />
			<section className="main-section">
				<DashboardHeader />
				<div className="main-section__body">{children}</div>
			</section>
		</main>
	);
};
