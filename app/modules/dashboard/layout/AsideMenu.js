import React from "react";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

export const AsideMenuLinks = () => {
	const router = useRouter();
	const { asPath } = router;

	const getActiveClass = path => {
		if (asPath.includes(path)) return "active";
		else return "";
	};

	const handleClick = path => {
		router.push(`/dashboard/${path}`);
	};

	const handleDashboard = () => {
		router.push(`/dashboard`);
	};

	return (
		<div className="aside-menu">
			<div className="aside-menu-links">
				{/*
				<div className="aside-menu-link">
					<SVG src={"../media/svg/menu-icons/balance.svg"} />
					<p className="menu--text">Balance</p>
					</div> */}
				<div
					className={
						asPath === "/dashboard/webhooks"
							? "aside-menu-link active"
							: "aside-menu-link"
					}
					onClick={() => {
						handleClick("webhooks");
					}}
				>
					{asPath === "/dashboard/webhooks" ? (
						<SVG src={"../../../media/svg/notifications.svg"} />
					) : (
						<SVG src={"../../../media/svg/notifications.svg"} />
					)}
					<p className="menu--text">Requests</p>
				</div>

				<div className="settings-menu">
					<div
						className={
							asPath === "/dashboard/settings"
								? "aside-menu-link active"
								: "aside-menu-link"
						}
						onClick={() => {
							handleClick("settings");
						}}
					>
						{asPath === "/dashboard/settings" ? (
							<SVG src={"../../../media/svg/menu-icons/settings-lte.svg"} />
						) : (
							<SVG src={"../../../media/svg/menu-icons/settings.svg"} />
						)}
						<p className="menu--text">Settings</p>
					</div>
				</div>
			</div>
		</div>
	);
};
