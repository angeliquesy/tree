import { inject } from "mobx-react";
import Store from "store";
import { useDialogContext } from "hooks/use-dialog-context";
import { DialogKind } from "dialog-manager";
import IconButton from "./icon-button";
//@ts-expect-error svg import conflict
import { ReactComponent as AddIcon } from "static/icons/add.svg";
//@ts-expect-error svg import conflict
import { ReactComponent as EditIcon } from "static/icons/edit.svg";
//@ts-expect-error svg import conflict
import { ReactComponent as BinIcon } from "static/icons/bin.svg";
import cn from "classnames";

interface Props {
	id: number;
	name: string;
	createNode: () => void;
	editNode: () => void;
	deleteNode: () => void;
	canEdit: boolean;
	canDelete: boolean;
	className?: string;
}

function Toolbar({ className, id, name, createNode, deleteNode, editNode, canEdit = true, canDelete = true }: Props) {
	const { Dialog } = useDialogContext();

	function handleOpenCreateDialog() {
		Dialog.openDialog({ kind: DialogKind.Input, title: "Create", text: "Node name", action: createNode });
	}

	function handleOpenEditDialog() {
		Dialog.openDialog({
			kind: DialogKind.Input,
			title: "Edit",
			text: "New node name",
			value: name,
			action: editNode,
		});
	}

	function handleOpenDeleteDialog() {
		Dialog.openDialog({
			kind: DialogKind.Text,
			title: "Delete",
			text: `Do you want to delete ${id}?`,
			action: deleteNode,
		});
	}

	return (
		<div className={cn("toolbar", className)}>
			<IconButton color="blue" Icon={AddIcon} onClick={handleOpenCreateDialog} />
			{canEdit && <IconButton color="blue" Icon={EditIcon} onClick={handleOpenEditDialog} />}
			{canDelete && <IconButton color="red" Icon={BinIcon} onClick={handleOpenDeleteDialog} />}
		</div>
	);
}

export default inject(({ store }: { store: Store }) => ({
	createNode: store.createNode,
	editNode: store.editNode,
	deleteNode: store.deleteNode,
}))(Toolbar);
