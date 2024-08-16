import { action, makeObservable, observable } from "mobx";
import { TreeNode } from "./types";
import { createNode, deleteNode, getTree, renameNode } from "./api";

export default class Store {
	@observable public data: TreeNode | null = null;
	@observable public selectedId: number | null = null;

	public constructor() {
		makeObservable(this);

		this.fetchData();
	}

	public createNode = async (value: string) => {
		await createNode(String(this.selectedId), value);
		this.fetchData();
	};

	public editNode = async (value: string) => {
		await renameNode(String(this.selectedId), value);
		this.fetchData();
	};

	public deleteNode = async () => {
		await deleteNode(String(this.selectedId));
		this.fetchData();
	};

	@action
	public setSelectedId = (id: number) => {
			this.selectedId = id;
		};

	@action
	private setData(data: TreeNode) {
		this.data = data;
	}

	private async fetchData() {
		const data = await getTree();
		this.setData(data);
	}
}
