import Tree from "components/tree";
import Store from "./store";
import { Provider } from "mobx-react";
import { DialogManager } from "./dialog-manager";
import Dialog from "components/dialog";

function App() {
	const mainStore = new Store();

	return (
		<DialogManager>
			<Provider store={mainStore}>
				{/* @ts-expect-error with mobx inject */}
				<Tree />
			</Provider>
			<Dialog />
		</DialogManager>
	);
}

export default App;
