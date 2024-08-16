import Toolbar from "components/toolbar";
import { inject } from "mobx-react";
import Store from "store";
//@ts-expect-error svg import conflict
import { ReactComponent as ChevronIcon } from "static/icons/chevron.svg";
import cn from "classnames";

interface Props {
	hasChildren: boolean;
	name: string;
	id: number;
	isRoot: boolean;
	isExpanded: boolean;
	setIsExpanded: (value: boolean) => void;
	selectedId: number | null;
	setSelectedId: (id: number) => void;
}

function NodeRow({ id, name, isRoot, hasChildren, isExpanded, setIsExpanded, selectedId, setSelectedId }: Props) {
	const isSelected = id === selectedId;
	const classes = cn("node-row", { "node-row--selected": isSelected });
	const iconClasses = cn("node-row__chevron", { "node-row__chevron--expanded": isExpanded });

	function handleClick() {
		if (hasChildren) {
			setIsExpanded(!isExpanded);
		}

		if (!isSelected) {
			setSelectedId(id);
		}
	}

	return (
		<div className={classes} onClick={handleClick}>
			{hasChildren && (
				<span className={iconClasses}>
					<ChevronIcon />
				</span>
			)}

			{name}

			{isSelected && (
				// @ts-expect-error with mobx inject
				<Toolbar canDelete={!isRoot} canEdit={!isRoot} className="node-row__toolbar" id={id} name={name} />
			)}
		</div>
	);
}

export default inject(({ store }: { store: Store }) => ({
	selectedId: store.selectedId,
	setSelectedId: store.setSelectedId,
}))(NodeRow);
