import { type FC, type PropsWithChildren, useState } from "react";
import { FormsModal } from "../../components/FormsModal/FormsModal.tsx";
import { Header } from "../../components/Header/Header.tsx";
import classes from "./MainPage.module.css";

const MainPage: FC<PropsWithChildren> = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen((prevState) => !prevState);

	return (
		<>
			{isModalOpen ? <FormsModal onClose={toggleModal} /> : null}

			<div className={classes.mainPage}>
				<Header openFormHandler={toggleModal} />

				<div className={classes.pageContent}>{children}</div>
			</div>
		</>
	);
};
MainPage.displayName = "MainPage";

export { MainPage };
