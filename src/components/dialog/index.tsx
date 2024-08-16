import { useDialogContext } from "hooks/use-dialog-context";
import { observer } from "mobx-react";
import InputDialog from "./input-dialog";
import ConfirmDialog from "./confirm-dialog";
import { DialogKind } from "dialog-manager";

function Dialog() {
	const {
		Dialog: { isOpen, confirm, dialogData },
	} = useDialogContext();

	if (!isOpen || !dialogData) {
		return null;
	}

	const { kind, text, value } = dialogData;

	if (kind === DialogKind.Input) {return <InputDialog confirm={confirm} inputText={value} placeholder={text} />;}

	if (kind === DialogKind.Text) {return <ConfirmDialog text={text as string} />;}
}

export default observer(Dialog);
