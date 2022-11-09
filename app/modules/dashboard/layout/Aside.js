import React from "react";
import SVG from "react-inlinesvg";
import { AsideMenuLinks } from "./AsideMenu";

export const Aside = () => {
	return (
		<div className="aside">
			<SVG src={"../../../media/svg/logo.svg"} />
			<AsideMenuLinks />
		</div>
	);
};
