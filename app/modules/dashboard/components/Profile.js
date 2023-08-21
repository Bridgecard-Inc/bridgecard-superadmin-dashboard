import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import { ProfileForm } from "./form/ProfileForm";
import SVG from "react-inlinesvg";

export default function Profile() {
	const [fetching, setFetching] = useState(true);
	const [isEdited, setisEdited] = useState(false);
	const [adminDetails, setAdminDetails] = useState([]);

	const profileEdited = () => {
		setisEdited(prev => !prev);
	};

	return (
		<React.Fragment>
			<h1 className="profile-heading">Topup Admin</h1>

			<div className="profile-form-area">
				<ProfileForm profileEdited={profileEdited} />
			</div>
		</React.Fragment>
	);
}
