import React from "react";
import Verification from "../../app/modules/dashboard/verification/Verification";
import { BvnModal } from "../../app/modules/dashboard/modals/bvn/BvnModal";

export default function VerificationPage() {
	return (
		<React.Fragment>
			<Verification />
			<BvnModal />
		</React.Fragment>
	);
}
