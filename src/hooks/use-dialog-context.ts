import { useContext } from "react";
import { DialogContext, Dialogs } from "../dialog-manager";

export const useDialogContext = () => {
	const context = useContext(DialogContext);

	if (context == null) {
		throw new Error("useDialogContext must be used within DialogManager");
	}

	return context as Dialogs;
};
