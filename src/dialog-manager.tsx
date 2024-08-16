import { createContext, PropsWithChildren } from "react";
import { action, makeObservable, observable } from "mobx";

export enum EDialogOptions {
	Dialog = "Dialog",
}

export enum DialogKind {
	Input = "input",
	Text = "text",
}

export type Dialogs = Record<EDialogOptions, Dialog>;

type Action = <T extends (...args: Parameters<T>) => unknown>() => void;

interface DialogData {
	kind: DialogKind;
	title: string;
	text?: string;
	value?: string;
	action: Action;
}

class Dialog {
	@observable public isOpen: boolean;
	@observable public dialogData: DialogData | null;

	constructor() {
		makeObservable(this);
		this.isOpen = false;
		this.dialogData = null;
	}

	public openDialog = (dialogData: DialogData): void => {
		this.setIsOpen(true);
		this.setDialogData(dialogData);
	};

	public confirm: Action = (...args) => {
		this.dialogData!.action(...args);
		this.closeDialog();
	};

	public closeDialog = (): void => {
		this.setIsOpen(false);
	};

	@action
	private setIsOpen(value: boolean) {
		this.isOpen = value;
	}

	@action
	private setDialogData(data: DialogData) {
		this.dialogData = data;
	}
}

class DialogsStore {
	public dialogs!: Dialogs;

	constructor() {
		makeObservable(this);
		this.dialogs = {
			Dialog: new Dialog(),
		};
	}
}

export const DialogContext = createContext<Record<string, Dialog>>({});

export function DialogManager({ children }: PropsWithChildren) {
	const dialogsStore = new DialogsStore();
	return <DialogContext.Provider value={dialogsStore.dialogs}>{children}</DialogContext.Provider>;
}
