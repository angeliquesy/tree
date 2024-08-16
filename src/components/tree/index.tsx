import { useState } from "react";
import { TreeNode } from "types";
import { inject } from "mobx-react";
import Store from "store";
import NodeRow from "./node-row";

interface Props {
	isRoot?: boolean;
	data: TreeNode;
}

function Tree({ data, isRoot = true }: Props) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (data === null) {
		return null;
	}

	const { children: nodes, name, id } = data;
	const hasChildren = nodes!.length > 0;

	return (
		<div className="tree">
			{/* @ts-expect-error with mobx inject */}
			<NodeRow
				hasChildren={hasChildren}
				id={id}
				isExpanded={isExpanded}
				isRoot={isRoot}
				name={name}
				setIsExpanded={setIsExpanded}
			/>

			{isExpanded && (
				<ul>
					{nodes.map((node) => (
						<li key={node.id}>
							<Tree data={node} isRoot={false} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default inject(({ store }: { store: Store }) => ({
	data: store.data,
}))(Tree);
