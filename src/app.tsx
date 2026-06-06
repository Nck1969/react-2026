import "./app.css";
import { UncontrolledForm } from "./components/Forms/UncontrolledForm/UncontrolledForm.tsx";
import { Modal } from "./components/Modal/Modal.tsx";

export function App() {
	return (
		<>
			<Modal title={"Hello"} onClose={() => console.log("test")}>
				<UncontrolledForm />
			</Modal>
		</>
	);
}
