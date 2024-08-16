import { TreeNode } from "./types";
import { request } from "helpers/request";

const BASE_URL = "https://test.vmarmysh.com";
const TREE_NAME = "AngelicaTree";
const baseParams = { treeName: TREE_NAME };

const webApi = request(BASE_URL);

export async function getTree(): Promise<TreeNode> {
	const params = new URLSearchParams(baseParams);

	const response = await webApi({ url: `api.user.tree.get?${params}`, method: "POST" });
	const data = await response.json();
	return data as TreeNode;
}

export function createNode(id: string, name: string) {
	const params = new URLSearchParams({
		...baseParams,
		parentNodeId: id,
		nodeName: name,
	});

	return webApi({ url: `api.user.tree.node.create?${params}`, method: "POST" });
}

export function renameNode(id: string, name: string) {
	const params = new URLSearchParams({
		...baseParams,
		nodeId: id,
		newNodeName: name,
	});

	return webApi({ url: `api.user.tree.node.rename?${params}`, method: "POST" });
}

export function deleteNode(id: string) {
	const params = new URLSearchParams({
		...baseParams,
		nodeId: id,
	});

	return webApi({ url: `api.user.tree.node.delete?${params}`, method: "POST" });
}
