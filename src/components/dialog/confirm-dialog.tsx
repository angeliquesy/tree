import DialogContainer from "./dialog-container";

interface Props {
	text: string;
}

function ConfirmDialog({ text }: Props) {
	return <DialogContainer>{text}</DialogContainer>;
}

export default ConfirmDialog;
