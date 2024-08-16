import Button from "components/button";
import { useDialogContext } from "hooks/use-dialog-context";
import { observer } from "mobx-react";
import { useEffect } from "react";

interface Props {
	children: React.ReactNode;
	onConfirm?: () => void;
}

function DialogContainer({ onConfirm, children }: Props) {
	const {
		Dialog: { closeDialog, dialogData, confirm },
	} = useDialogContext();
	const { title } = dialogData!;

	useEffect(() => {
		document.body.setAttribute("style", "padding-right: 17px; overflow: hidden;");

		return () => {
			document.body.removeAttribute("style");
		};
	}, []);

	return (
		<div className="dialog-wrapper">
			<div className="dialog">
				<div className="dialog__header">{title}</div>
				<div className="dialog__content">{children}</div>
				<div className="dialog__footer">
					<Button className="dialog__footer-button" kind="secondary" onClick={closeDialog} title="Cancel" />
					<Button className="dialog__footer-button" onClick={onConfirm ?? confirm} title={title} />
				</div>
			</div>
		</div>
	);
}

export default observer(DialogContainer);
