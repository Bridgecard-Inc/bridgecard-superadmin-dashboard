import React, { useState, useEffect } from "react";
import { setPersonalDeets, logout } from "../../../redux/slices/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import { Toggle } from "../../../utils/Toggle";
import Avatar from "react-avatar";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

const DashboardHeader = () => {
	const dispatch = useDispatch();
	const [logoutVisible, setLogoutVisible] = useState(false);
	const router = useRouter();
	const { admindetails } = useSelector(state => state.app);
	useEffect(() => {
		const fetchAdminDeets = async id => {
			try {
				const res = await axios.get("admin/", {
					headers: {
						token: `Bearer ${id}`,
					},
				});

				if (res.status === 200) {
					dispatch(setPersonalDeets(res.data.data));
				}
			} catch (err) {
			} finally {
			}
		};
		callApiWithToken(fetchAdminDeets);
	}, [dispatch]);

	// const handleLogout = async () => {
	// 	await dispatch(logout());
	// 	router.push("/login");
	// };

	return (
		<div className="dashboard-header">
			<Toggle />

			<div
				className="admin-deets"
				onClick={() => {
					setLogoutVisible(prev => !prev);
				}}
			>
				<div className="avatar-admin">
					<SVG src={"../../../media/svg/header-avatar.svg"} />
				</div>

				<div className="company-deets">
					<p>{admindetails?.company_name}</p>
					<small>{admindetails?.work_email}</small>
				</div>

				<div className="header-arrow pointer">
					<SVG src={`../../../media/svg/menu-icons/arrow.svg`} />
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
