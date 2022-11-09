import React from "react";
import IssuedCards from "../../../app/modules/dashboard/issued-cards/IssuedCards";
import { CardHolderModal } from "../../../app/modules/dashboard/modals/cardholder/CardHolderModal";
import { CreateCardHolderModal } from "../../../app/modules/dashboard/modals/cardholder/CreateCardHolderModal";
import { DeleteCardHolderModal } from "../../../app/modules/dashboard/modals/cardholder/DeleteCardHolder";
import { EditCardHolderModal } from "../../../app/modules/dashboard/modals/cardholder/EditCardHolderModal";
import { CardDetailsModal } from "../../../app/modules/dashboard/modals/cards/CardDetailsModal";
import { CreateCardModal } from "../../../app/modules/dashboard/modals/cards/CreateCardModal";
import { DeleteCardModal } from "../../../app/modules/dashboard/modals/cards/DeleteCardModal";
import { FundCardModal } from "../../../app/modules/dashboard/modals/cards/FundCardModal";
import { UnloadCardModal } from "../../../app/modules/dashboard/modals/cards/UnloadCard";
import { TableUIProvider } from "../../../_helpers/TableUIContext";

export default function issuedcards() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<IssuedCards />
			</TableUIProvider>
			<CardHolderModal />
			<CreateCardHolderModal />
			<EditCardHolderModal />
			<DeleteCardHolderModal />
			<CreateCardModal />
			<DeleteCardModal />
			<CardDetailsModal />
			<FundCardModal />
			<UnloadCardModal />
		</React.Fragment>
	);
}
