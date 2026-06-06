import "./app.css";
import { Modal } from "./components/Modal/Modal.tsx";

export function App() {
	return (
		<>
			<Modal title={"Hello"} onClose={() => console.log("test")}>
				{"asd"}
			</Modal>
		</>
	);
}
