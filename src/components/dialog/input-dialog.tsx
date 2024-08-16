import { FormEvent, useState } from "react";
import DialogContainer from "./dialog-container";

interface Props {
	confirm: (value: string) => void;
	placeholder?: string;
	inputText?: string;
}

function InputDialog({ confirm, inputText = "", placeholder }: Props) {
	const [value, setValue] = useState(inputText);

	function handleConfirm() {
		confirm(value);
	}

	function handleValueChange(event: FormEvent<HTMLInputElement>) {
		setValue(event.currentTarget.value);
	}

	return (
		<DialogContainer onConfirm={handleConfirm}>
			<input className="dialog__input" onChange={handleValueChange} placeholder={placeholder} value={value} />
		</DialogContainer>
	);
}

export default InputDialog;
