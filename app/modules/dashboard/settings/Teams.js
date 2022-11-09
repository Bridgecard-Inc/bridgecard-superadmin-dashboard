import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { callApiWithToken } from "../../../utils/callApiWithToken";
import axios from "axios";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { NoWebhook } from "../webhook/webhook-table/NoWebhook";
import { useAuthContext } from "../../../firebase/AuthContext";

export const Teams = () => {
	const [fetching, setFetching] = useState(false);
	const [teamMembers, setTeamMembers] = useState([]);
	const context = useAuthContext();
	const { admindetails } = useSelector(state => state.app);

	const {
		setIsTeamsCardModalVisible,
		setIsRemoveMemberModalVisible,
		hasCardChanged,
		setMember,
	} = context;
	const openModal = () => {
		setIsTeamsCardModalVisible(true);
	};

	const openRemoveModal = () => {
		setIsRemoveMemberModalVisible(true);
	};

	const fetchTeamMembers = async id => {
		setFetching(true);
		try {
			const res = await axios.get("admin/team-members", {
				headers: {
					token: `Bearer ${id}`,
				},
			});

			if (res.status === 200) {
				setTeamMembers(Object.values(res?.data.data.team_member));
			}
		} catch (err) {
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		callApiWithToken(fetchTeamMembers);
	}, [hasCardChanged]);

	return fetching ? (
		<div className="loading-div">
			<ThreeDots color="#141416" height={60} width={60} />
		</div>
	) : (
		<React.Fragment>
			<h1 className="profile-heading">Team Members</h1>
			<div className="teams-card">
				<div className="teams-card__header">
					<h3>{admindetails?.company_name}</h3>
					<div className="add-members-btn" onClick={openModal}>
						Add members
					</div>
				</div>
				{teamMembers.map((member, index) => {
					return (
						<div className="teams-card__row" key={index}>
							<div className="row--content">
								<Avatar name={member.work_email} size="40" round />
								<div className="member-deets">
									{" "}
									<h3>{member.work_email}</h3>
									<span>{member.invite_status}</span>
								</div>
							</div>
							{member.invite_status === "accepted" && (
								<div
									className="remove-members-btn"
									onClick={() => {
										setMember(member);
										openRemoveModal();
									}}
								>
									Remove
								</div>
							)}
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};
