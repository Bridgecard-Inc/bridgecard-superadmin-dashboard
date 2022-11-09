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

	const fetchAdminDeets = async id => {
		setFetching(true);
		try {
			const res = await axios.get("admin/", {
				headers: {
					token: `Bearer ${id}`,
				},
			});

			if (res.status === 200) {
				setAdminDetails(res.data.data);
			}
		} catch (err) {
		} finally {
			setFetching(false);
		}
	};

	const profileEdited = () => {
		setisEdited(prev => !prev);
	};

	useEffect(() => {
		callApiWithToken(fetchAdminDeets);
	}, [isEdited]);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="profile-heading">Personal Information</h1>

			<div className="profile-form-area">
				<ProfileForm
					adminDetails={adminDetails}
					profileEdited={profileEdited}
				/>
			</div>
		</React.Fragment>
	);
}
