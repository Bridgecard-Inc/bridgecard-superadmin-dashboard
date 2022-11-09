import React from "react";
import { AddMembersModal } from "../../app/modules/dashboard/modals/teams/AddMembersModal";
import { RemoveMemberModal } from "../../app/modules/dashboard/modals/teams/RemoveMemberModal";
import { Settings } from "../../app/modules/dashboard/settings/Settings";

function settings() {
	return (
		<React.Fragment>
			<Settings />
			<AddMembersModal />
			<RemoveMemberModal />
		</React.Fragment>
	);
}

export default settings;
