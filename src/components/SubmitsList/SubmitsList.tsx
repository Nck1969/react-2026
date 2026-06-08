import clsx from "clsx";
import { memo } from "react";
import useFormStore from "../../store/formStore.ts";
import classes from "./SubmitsList.module.css";

const SubmitsList = memo(() => {
	const items = useFormStore((store) => store.submits);

	return (
		<ul className={classes.submitList}>
			{items.toReversed().map((item, index) => (
				<li
					key={item.id}
					className={clsx(
						classes.submitListItem,
						index === 0 ? classes.submitListItemNewest : undefined,
					)}
				>
					{Object.entries(item).map((entry) => {
						const [key, value] = entry;

						if (key === "id") {
							return null;
						}

						if (key === "image") {
							return <img src={String(value)} alt={"user"} key={key} />;
						}

						return <span key={key}>{`${key}: ${value}`}</span>;
					})}
				</li>
			))}
		</ul>
	);
});
SubmitsList.displayName = "SubmitsList";

export { SubmitsList };
