import "./app.css";
import { RHFForm } from "./components/Forms/RHFForm/RHFForm.tsx";
import { UncontrolledForm } from "./components/Forms/UncontrolledForm/UncontrolledForm.tsx";
import { Modal } from "./components/Modal/Modal.tsx";

export function App() {
	return (
		<Modal title={"Hello"} onClose={() => console.log("test")}>
			<RHFForm />
			<UncontrolledForm />
		</Modal>
	);
}
