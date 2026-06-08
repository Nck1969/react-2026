import "./app.css";
import { SubmitsList } from "./components/SubmitsList/SubmitsList.tsx";
import { MainPage } from "./pages/Main/MainPage.tsx";

export function App() {
	return (
		<MainPage>
			<SubmitsList />
		</MainPage>
	);
}
